export default class InvalidGroupsSortError extends Error {
    positions: string;
    constructor(positions: string) {
        super();
        this.positions = positions;
        this.message = `The groups aren't sorted sequentially [${this.positions}]`;
    }
}
