import type { Client } from '@walletconnect/client/dist/cjs/client';

import type { SessionTypes, ClientTypes } from '@walletconnect/types';

export default interface IWalletConnect {
    initClient: () => Promise<Client>;

    createPairing: (client: Client) => Promise<void>;

    createSession: (client: Client) => Promise<SessionTypes.Settled>;

    deleteSession: (session: SessionTypes.Settled, client: Client) => Promise<void>;

    sign: (session: SessionTypes.RequestParams, client: Client, xdr: string) => Promise<ClientTypes.RespondParams>;
}
