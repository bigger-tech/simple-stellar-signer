export default interface IStorage {
    clearStorage(): void;
    storeItem(key: string, value: string): void;
    getItem(key: string): string | null;
}
