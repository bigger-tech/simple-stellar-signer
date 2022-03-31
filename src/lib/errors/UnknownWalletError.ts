export default class UnknownWalletError extends Error {
    wallet: string;
    constructor(wallet: string) {
        super();
        this.wallet = wallet;
        this.message = `Unknown wallet: ${wallet}`;
    }
}
