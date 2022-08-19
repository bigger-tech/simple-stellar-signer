import LedgerStr from '@ledgerhq/hw-app-str';
import LedgerTransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { Keypair, Transaction, xdr } from 'stellar-sdk';

import { ledger } from '../../../assets';
import type IStorage from '../../storage/IStorage';
import AbstractWallet from '../AbstractWallet';
import type IWallet from '../IWallet';

export const LEDGER_WALLET_SIGN_START = 'LEDGER_WALLET_SIGN_START';
export const LEDGER_WALLET_SIGN_SUCCESS = 'LEDGER_WALLET_SIGN_SUCCESS';
export const LEDGER_WALLET_SIGN_ERROR = 'LEDGER_WALLET_SIGN_ERROR';

export default class Ledger extends AbstractWallet implements IWallet {
    public static NAME = 'ledger';
    public static FRIENDLY_NAME = 'Ledger';
    public ledgerStr: LedgerStr | null = null;
    private bipPath = "44'/148'/0'";

    constructor(storage: IStorage) {
        super(storage);
    }

    public override async getPublicKey(): Promise<string> {
        const transport = await LedgerTransportWebUSB.create();
        this.ledgerStr = new LedgerStr(transport);
        const { publicKey } = await this.ledgerStr.getPublicKey(this.bipPath);
        super.persistWallet(publicKey);
        return publicKey;
    }

    public override async sign(tx: Transaction): Promise<string> {
        try {
            const transport = await LedgerTransportWebUSB.create();
            const str = new LedgerStr(transport);
            const signatureFromLedger = await str.signTransaction(this.bipPath, tx.signatureBase());

            const keyPair = Keypair.fromPublicKey(this.storage.getItem(this.WALLET_PUBLIC_KEY_STORAGE_KEY)!);
            const hint = keyPair.signatureHint();
            const decorated = new xdr.DecoratedSignature({
                hint,
                signature: signatureFromLedger.signature,
            });
            tx.signatures.push(decorated);

            return tx.toXDR();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public override getFriendlyName(): string {
        return Ledger.FRIENDLY_NAME;
    }

    public override getName(): string {
        return Ledger.NAME;
    }

    public override getImage(): string {
        return ledger;
    }

    public override getExtension(): string {
        return '';
    }

    public override async isInstalled(): Promise<boolean> {
        return true;
    }
}
