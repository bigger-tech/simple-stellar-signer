import * as StellarSDK from 'stellar-sdk';
const server = new StellarSDK.Server('https://horizon-testnet.stellar.org');

export { StellarSDK, server };
