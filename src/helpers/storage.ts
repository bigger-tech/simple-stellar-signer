export function storeData(key: string, value: string): void {
    sessionStorage.setItem(key, value);
}

export function getStoredData(key: string): string | null {
    const data = sessionStorage.getItem(key);
    return data;
}
