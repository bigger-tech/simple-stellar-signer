export function getShortedStellarKey(string: string) {
    if (string.length === 56) {
        return string.slice(0, 4).concat('...').concat(string.substr(-4));
    } else {
        throw new Error();
    }
}

export function allAreTrue(arr: boolean[]) {
    return arr.every((element) => element === true);
}

export function allAreFalse(arr: boolean[]) {
    return arr.every((element) => element === false);
}
