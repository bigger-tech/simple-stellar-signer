/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HORIZON_NETWORK_PASSPHRASE: string;
    readonly VITE_STELLAR_NETWORK: string;
    readonly VITE_PROJECT_ID_FOR_WALLET_CONNECT: string;
    readonly VITE_PROJECT_NAME_FOR_WALLET_CONNECT: string;
    readonly VITE_PROJECT_DESCRIPTION_FOR_WALLET_CONNECT: string;
    readonly VITE_PROJECT_URL_FOR_WALLET_CONNECT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
