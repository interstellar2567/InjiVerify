export interface VerificationResult {
  id?: number;
  vcHash: string;
  timestamp: number;
  status: 'SUCCESS' | 'FAILED';
  vcData: any;
  verificationDetails?: any;
}

class IndexedDBService {
  private dbName = 'InjiVerifyDB';
  private version = 1;
  private storeName = 'verificationResults';

  private async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
          store.createIndex('vcHash', 'vcHash', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('status', 'status', { unique: false });
        }
      };
    });
  }

  async storeVerificationResult(result: Omit<VerificationResult, 'id'>): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const request = store.add(result);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getVerificationResults(): Promise<VerificationResult[]> {
    const db = await this.openDB();
    const transaction = db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getVerificationResultByVCHash(vcHash: string): Promise<VerificationResult | null> {
    const db = await this.openDB();
    const transaction = db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    const index = store.index('vcHash');

    return new Promise((resolve, reject) => {
      const request = index.get(vcHash);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async clearAllResults(): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const indexedDBService = new IndexedDBService();

// Utility function to generate hash of VC data
export async function generateVCHash(vcData: any): Promise<string> {
  try {
    // Handle different data types and ensure we can stringify
    let dataString: string;
    if (typeof vcData === 'string') {
      dataString = vcData;
    } else if (vcData && typeof vcData === 'object') {
      // Remove any circular references and non-serializable data
      const cleanData = JSON.parse(JSON.stringify(vcData, (key, value) =>
        typeof value === 'function' ? undefined : value
      ));
      dataString = JSON.stringify(cleanData);
    } else {
      dataString = String(vcData || '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(dataString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    console.warn('Failed to generate VC hash, using fallback:', error);
    // Fallback: use a simple hash of the string representation
    const fallbackString = String(vcData || 'empty');
    let hash = 0;
    for (let i = 0; i < fallbackString.length; i++) {
      const char = fallbackString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }
}

export default indexedDBService;
