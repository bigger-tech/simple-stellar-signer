import { getPublicKey, isConnected, signTransaction } from '@lobstrco/signer-extension-api';
import type { FeeBumpTransaction, Transaction } from 'stellar-sdk';

import { LobstrIcon } from '../../../assets';
import { StellarNetwork } from '../../stellar/StellarNetwork';
import type IStorage from '../../storage/IStorage';
import AbstractWallet from '../AbstractWallet';
import type IWallet from '../IWallet';

export default class Lobstr extends AbstractWallet implements IWallet {
    public static readonly NAME = 'lobstr';
    public static readonly FRIENDLY_NAME = 'Lobstr';
    public static readonly lobstrExtension = 'https://lobstr.co/signer-extension/';
    public lobstrNetwork = StellarNetwork.PUBLIC.toUpperCase();

    constructor(storage: IStorage) {
        super(storage);
    }

    public override async getPublicKey(): Promise<string> {
        const publicKey = await getPublicKey();
        super.persistWallet();
        return publicKey;
    }

    public override async sign(tx: Transaction | FeeBumpTransaction): Promise<string> {
        return signTransaction(tx.toXDR());
    }

    public override getFriendlyName(): string {
        return Lobstr.FRIENDLY_NAME;
    }

    public override getName(): string {
        return Lobstr.NAME;
    }

    public override getSvgIcon(): typeof LobstrIcon {
        return LobstrIcon;
    }

    public override getExtension(): string {
        return Lobstr.lobstrExtension;
    }

    public override async isInstalled(): Promise<boolean> {
        return isConnected();
    }
}
