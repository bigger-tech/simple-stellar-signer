/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TESTNET: string;
    readonly VITE_TEST_PRIVATEKEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
