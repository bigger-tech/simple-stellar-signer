import { Asset, BASE_FEE, Operation, TransactionBuilder } from 'stellar-sdk';

import { CURRENT_NETWORK_PASSPHRASE } from './StellarNetwork';
import { server } from './utils';

export async function createPaymentTransaction(
    publicKey: string,
    receiver: string,
    amount: string,
    assetType: string,
    issuer?: string,
) {
    let asset;
    if (assetType === 'native') {
        asset = Asset.native();
    } else {
        asset = new Asset(assetType, issuer);
    }
    try {
        const account = await server.loadAccount(publicKey);
        return new TransactionBuilder(account, {
            fee: BASE_FEE,
            networkPassphrase: CURRENT_NETWORK_PASSPHRASE,
        })
            .addOperation(
                Operation.payment({
                    destination: receiver,
                    asset: asset,
                    amount: amount,
                }),
            )
            .setTimeout(30)
            .build();
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
