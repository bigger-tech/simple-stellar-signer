export function storeItem(key: string, value: string): void {
    localStorage.setItem(key, value);
}

export function getItem(key: string): string | null {
    const data = localStorage.getItem(key);
    return data;
}
