/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TESTNET: string;
    readonly VITE_TESTPRIVATE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
