export default interface IXBull {
    connect: (params: {
        canRequestPublicKey: boolean;
        canRequestSign: boolean;
    }) => Promise<{ canRequestPublicKey: boolean; canRequestSign: boolean }>;
    getPublicKey: () => Promise<string>;
    signXDR: (xdr: string, opParams?: { publicKey?: string; network?: string }) => Promise<string>;
    isConnected: () => boolean;
}
