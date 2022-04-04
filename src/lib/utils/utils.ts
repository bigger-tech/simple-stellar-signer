export function removeDuplicates(array: string[]): string[] {
    const deduplicatedArray = [...new Set(array)];
    if (deduplicatedArray.length !== array.length) {
        console.warn(
            `One or more elements were deleted for duplicate (Given array: ${array} - Deduplicated array: ${deduplicatedArray})`,
        );
    }
    return deduplicatedArray;
}
