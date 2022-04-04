/// <reference types="svelte" />
/// <reference types="vite/client" />

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly VITE_HORIZON_NETWORK_PASSPHRASE: string;
            readonly VITE_STELLAR_NETWORK: string;
        }
    }
}

export {};
