export function getShortedStellarKey(string: string): string {
    return string.slice(0, 4).concat('...').concat(string.substr(-4));
}

export function checkIfAllAreTrue(arr: boolean[]): boolean {
    return arr.every((element) => element === true);
}

export function checkIfAllAreFalse(arr: boolean[]): boolean {
    return arr.every((element) => element === false);
}
