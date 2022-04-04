export enum StellarNetwork {
    PUBLIC = 'public',
    TESTNET = 'testnet',
}

export const CURRENT_NETWORK_PASSPHRASE = import.meta.env.VITE_HORIZON_NETWORK_PASSPHRASE;
export const CURRENT_STELLAR_NETWORK = import.meta.env.VITE_STELLAR_NETWORK;
