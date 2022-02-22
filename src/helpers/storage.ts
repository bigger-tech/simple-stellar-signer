export function clearStorage(): void {
    window.localStorage.clear();
}

export function storeItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
}

export function getItem(key: string): string | null {
    const data = window.localStorage.getItem(key);
    return data;
}
