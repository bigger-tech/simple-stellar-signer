export function removeDuplicates(array: string[]): string[] {
    const deduplicatedArray = [...new Set(array)];
    if (deduplicatedArray.length !== array.length) {
        console.warn(
            `One or more wallets were deleted for duplicate (Given array: ${array} - Deduplicated array: ${deduplicatedArray})`,
        );
    }
    return deduplicatedArray;
}

export function getWalletsFromUrl(): string[] {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.getAll('wallets');
}
