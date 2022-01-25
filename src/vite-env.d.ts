/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HORIZON_URL: string;
    readonly VITE_TESTPRIVATE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
