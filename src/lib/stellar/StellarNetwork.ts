export enum StellarNetwork {
    PUBLIC = 'public',
    TESTNET = 'testnet',
}

export const CURRENT_NETWORK_PASSPHRASE = process.env.VITE_HORIZON_NETWORK_PASSPHRASE;
export const CURRENT_STELLAR_NETWORK = process.env.VITE_STELLAR_NETWORK;
