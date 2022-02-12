/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HORIZON_NETWORK_PASSPHRASE: string;
    readonly VITE_HOST_SIMPLE_SIGNER_DEMO: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
