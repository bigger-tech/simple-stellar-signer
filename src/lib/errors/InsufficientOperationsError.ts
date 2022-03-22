export default class InsufficientOperationsError extends Error {
    operationsLength: number;
    lastGroupOperation: number;
    constructor(operationsLength: number, lastGroupOperation: number) {
        super();
        this.operationsLength = operationsLength;
        this.lastGroupOperation = lastGroupOperation + 1;
        this.message = `There are fewer operations than the groups says. (${this.operationsLength}) operations | (${this.lastGroupOperation}) operations on the groups`;
    }
}
