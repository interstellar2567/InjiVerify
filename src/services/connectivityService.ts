export type ConnectivityStatus = 'online' | 'offline';

export interface ConnectivityState {
  isOnline: boolean;
  status: ConnectivityStatus;
  lastChecked: number;
}

class ConnectivityService {
  private listeners: ((status: ConnectivityState) => void)[] = [];
  private currentState: ConnectivityState = {
    isOnline: navigator.onLine,
    status: navigator.onLine ? 'online' : 'offline',
    lastChecked: Date.now(),
  };

  constructor() {
    // Listen for online/offline events
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);

    // Initial check
    this.updateConnectivityStatus();
  }

  private handleOnline = () => {
    this.updateConnectivityStatus();
  };

  private handleOffline = () => {
    this.updateConnectivityStatus();
  };

  private updateConnectivityStatus() {
    const isOnline = navigator.onLine;
    const newState: ConnectivityState = {
      isOnline,
      status: isOnline ? 'online' : 'offline',
      lastChecked: Date.now(),
    };

    this.currentState = newState;
    this.notifyListeners(newState);
  }

  public getCurrentState(): ConnectivityState {
    return { ...this.currentState };
  }

  public isOnline(): boolean {
    return this.currentState.isOnline;
  }

  public subscribe(listener: (status: ConnectivityState) => void): () => void {
    this.listeners.push(listener);

    // Immediately notify with current state
    listener(this.currentState);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(state: ConnectivityState) {
    this.listeners.forEach(listener => {
      try {
        listener(state);
      } catch (error) {
        console.error('Error in connectivity listener:', error);
      }
    });
  }

  // Manual connectivity check (useful for testing or forced refresh)
  public async checkConnectivity(): Promise<boolean> {
    try {
      // Try to fetch a small resource to verify actual connectivity
      const response = await fetch('/favicon.ico', {
        method: 'HEAD',
        cache: 'no-cache',
      });
      const isOnline = response.ok;
      this.updateConnectivityStatus();
      return isOnline;
    } catch {
      this.updateConnectivityStatus();
      return false;
    }
  }

  public destroy() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
    this.listeners = [];
  }
}

export const connectivityService = new ConnectivityService();
export default connectivityService;
