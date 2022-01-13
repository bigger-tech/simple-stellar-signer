import type { AccountResponse } from 'stellar-sdk';
import { server } from '../../api/stellarSDK';

export default async function getBalance(publicKey: string) {
    const response = await server.loadAccount(publicKey).then((account: AccountResponse) => {
        const balance = account.balances[0]?.balance;
        return balance;
    });
    return Number(response);
}
