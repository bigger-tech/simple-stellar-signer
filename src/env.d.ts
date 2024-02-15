/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HORIZON_NETWORK_PASSPHRASE: string;
    readonly VITE_STELLAR_NETWORK: string;
    readonly VITE_PROJECT_ID_FOR_WALLET_CONNECT: string;
    readonly VITE_DAPP_BASE_URL: string;
    readonly VITE_HORIZON_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
