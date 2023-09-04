import type IStorage from './IStorage';

export default class LocalStorage implements IStorage {
    clearStorage(key?: string): void {
        if (key) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.clear();
        }
    }

    getItem(key: string): string | null {
        return window.localStorage.getItem(key);
    }

    storeItem(key: string, value: string): void {
        return window.localStorage.setItem(key, value);
    }
}
