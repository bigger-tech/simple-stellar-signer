import { HORIZON_NETWORK_PASSPHRASE, STELLAR_NETWORK } from '../../constants';

export enum StellarNetwork {
    PUBLIC = 'public',
    TESTNET = 'testnet',
    FUTURENET = 'futurenet',
}

export const CURRENT_NETWORK_PASSPHRASE = HORIZON_NETWORK_PASSPHRASE;
export const CURRENT_STELLAR_NETWORK = STELLAR_NETWORK;
