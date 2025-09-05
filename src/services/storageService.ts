export interface StoredLog {
  id: string;
  createdAt: number;
  payload: unknown;
}

export const storageService = {
  async saveLog(log: StoredLog): Promise<void> {
    // TODO: implement with idb
    void log;
  },
  async getLogs(): Promise<StoredLog[]> {
    return [];
  },
  async clear(): Promise<void> {
    return;
  }
};

export default storageService;

