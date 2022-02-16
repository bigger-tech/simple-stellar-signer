export default interface Albedo {
    publicKey: (params: {
        token?: string;
        callback?: string;
        require_existing?: string;
    }) => Promise<{ pubkey: string; signed_message: string; signature: string }>;
}
