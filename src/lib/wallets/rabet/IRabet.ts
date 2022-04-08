export default interface IRabet {
    connect: () => Promise<{ publicKey: string }>;
    sign: (xdr: string, network: string) => Promise<{ xdr: string }>;
    isInstalled: () => Promise<boolean>;
}
