import xBull from "./xBull";

export enum Wallet {
    X_BULL = "xBull",
    ALBEDO = "Albedo",
    RABET = "Rabet",
    FREIGHTER = "Freighter",
}

export default (wallet) => {
    const wallets = {
        [Wallet.X_BULL]: xBull
    };
    return wallets[wallet]();
}
