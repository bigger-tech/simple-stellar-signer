export default interface IAlbedo {
    publicKey: (params: {
        token?: string;
        callback?: string;
        require_existing?: boolean;
    }) => Promise<{ pubkey: string; signed_message: string; signature: string }>;
    tx: (params: {
        xdr: string;
        network: string;
        opParams?: {
            pubkey?: string;
            callback?: string;
            submit?: boolean;
        };
    }) => Promise<{ xdr: string; tx_hash: string; signed_envelope_xdr: string; network: string; result: string }>;
    isConnected: () => boolean;
}
