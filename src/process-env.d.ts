/// <reference types="svelte" />
/// <reference types="vite/client" />

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly VITE_HORIZON_NETWORK_PASSPHRASE: string;
            readonly VITE_HOST_SIMPLE_SIGNER_DEMO: string;
            readonly VITE_WALLET_CONNECT_PROJECT_ID: string;
            readonly VITE_STELLAR_NETWORK: string;
            readonly VITE_WALLET_CONNECT_METADATA_URL: string;
        }
    }
}

export {};
