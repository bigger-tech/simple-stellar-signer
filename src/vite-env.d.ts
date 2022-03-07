/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HORIZON_NETWORK_PASSPHRASE: string;
    readonly VITE_STELLAR_NETWORK: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
