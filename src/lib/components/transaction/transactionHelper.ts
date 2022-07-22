export function checkIfAllAreTrue(arr: boolean[]): boolean {
    return arr.every((element) => element === true);
}

export function checkIfAllAreFalse(arr: boolean[]): boolean {
    return arr.every((element) => element === false);
}
