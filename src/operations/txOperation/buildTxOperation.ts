import { StellarSDK, server } from '../../api/stellarSDK';

export const buildTx = async (key: string, destination: string, amount: string) => {
    const sourceAccount = await server.loadAccount(key);

    const transaction = new StellarSDK.TransactionBuilder(sourceAccount, {
        fee: StellarSDK.BASE_FEE,
        networkPassphrase: StellarSDK.Networks.TESTNET,
    })
        .addOperation(
            StellarSDK.Operation.payment({
                destination,
                asset: StellarSDK.Asset.native(),
                amount,
            }),
        )
        .addMemo(StellarSDK.Memo.text('Transaction test'))
        .setTimeout(180)
        .build();
    return transaction;
};
