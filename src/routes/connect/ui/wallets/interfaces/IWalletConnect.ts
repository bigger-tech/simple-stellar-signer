import type { Client } from '@walletconnect/client/dist/cjs/client';

import type { SessionTypes, ClientTypes } from '@walletconnect/types';
import type { Transaction } from 'stellar-sdk';

export default interface IWalletConnect {
    initClient: () => Promise<Client>;

    createPairing: (client: Client) => Promise<void>;

    createSession: (client: Client) => Promise<SessionTypes.Settled>;

    deleteSession: (session: SessionTypes.Settled, client: Client) => Promise<void>;

    sign: (tx: Transaction) => Promise<ClientTypes.RespondParams>;
}
