export function storeItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
}

export function getItem(key: string): string | null {
    const data = sessionStorage.getItem(key);
    return data;
}
