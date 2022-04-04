import type IWallet from '../IWallet';
import type { Transaction } from 'stellar-sdk';
import { Keypair } from 'stellar-sdk';
import AbstractWallet from '../AbstractWallet';
import InvalidPrivateKeyError from './errors/InvalidPrivateKeyError';
import PrivateKeyStorageKeyNotFoundError from './errors/PrivateKeyStorageKeyNotFoundError';
import { decryptValue, encryptValue } from '../../security/securityHelper';
import type IDecryptableValue from '../../security/IDecryptableValue';

export default class PrivateKey extends AbstractWallet implements IWallet {
    public static NAME = 'privateKey';
    private CRYPTO_KEY_ITEM_NAME = 'cryptoKey';
    private PRIVATE_KEY_ITEM_NAME = 'privateKey';

    async getPublicKey(): Promise<string> {
        const privateKey = await this.getDecryptedStoredPrivateKey();
        return Keypair.fromSecret(privateKey).publicKey();
    }

    async logIn(privateKey: string): Promise<void> {
        try {
            const publicKey = Keypair.fromSecret(privateKey).publicKey();
            await this.storeEncryptedPrivateKey(privateKey);
            super.connectWithWallet(PrivateKey.NAME, publicKey);
        } catch (e) {
            if (e instanceof InvalidPrivateKeyError) {
                console.error('Invalid key, please try again');
            } else {
                throw e;
            }
        }
    }

    async sign(tx: Transaction): Promise<string> {
        const privateKey = await this.getDecryptedStoredPrivateKey();
        const keyPair = Keypair.fromSecret(privateKey);
        tx.sign(keyPair);
        return tx.toXDR();
    }

    private async storeEncryptedPrivateKey(key: string): Promise<void> {
        const decryptableValue = await encryptValue(key);
        this.storage.storeItem(this.CRYPTO_KEY_ITEM_NAME, decryptableValue.cryptoKey);
        this.storage.storeItem(this.PRIVATE_KEY_ITEM_NAME, decryptableValue.value);
    }

    private async getDecryptedStoredPrivateKey(): Promise<string> {
        try {
            const storedPrivateKey = this.storage.getItem(this.PRIVATE_KEY_ITEM_NAME);
            const storedCryptoKey = this.storage.getItem(this.CRYPTO_KEY_ITEM_NAME);
            return decryptValue({ value: storedPrivateKey, cryptoKey: storedCryptoKey } as IDecryptableValue);
        } catch (e) {
            throw new PrivateKeyStorageKeyNotFoundError();
        }
    }
}
