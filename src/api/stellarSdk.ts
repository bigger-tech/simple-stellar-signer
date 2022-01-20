import StellarSDK from 'stellar-sdk';
const server = new StellarSDK.Server(import.meta.env.VITE_TESTNET);

export { StellarSDK, server };
