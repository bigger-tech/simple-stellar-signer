import { getPublicKey, signTransaction } from '@stellar/freighter-api';
import type { Transaction } from 'stellar-sdk';

import { freighter } from '../../../assets';
import type Bridge from '../../bridge/Bridge';
import { CURRENT_STELLAR_NETWORK, StellarNetwork } from '../../stellar/StellarNetwork';
import type IStorage from '../../storage/IStorage';
import AbstractWallet from '../AbstractWallet';
import type IWallet from '../IWallet';

type FreighterNetwork = 'PUBLIC' | 'TESTNET';

export default class Freighter extends AbstractWallet implements IWallet {
    public static NAME = 'freighter';
    public static FRIENDLY_NAME = 'Freighter';
    public freighterNetwork: FreighterNetwork;

    constructor(bridge: Bridge, storage: IStorage) {
        super(bridge, storage);

        if (CURRENT_STELLAR_NETWORK === StellarNetwork.PUBLIC) {
            this.freighterNetwork = StellarNetwork.PUBLIC.toUpperCase() as FreighterNetwork;
        } else {
            this.freighterNetwork = StellarNetwork.TESTNET.toUpperCase() as FreighterNetwork;
        }
    }

    public override async getPublicKey(): Promise<string> {
        const publicKey = await getPublicKey();
        super.persistWallet();
        return publicKey;
    }

    public override async sign(tx: Transaction): Promise<string> {
        return signTransaction(tx.toXDR(), this.freighterNetwork);
    }

    public override getFriendlyName(): string {
        return Freighter.FRIENDLY_NAME;
    }

    public override getName(): string {
        return Freighter.NAME;
    }

    public override getImage(): string {
        return freighter;
    }
}
