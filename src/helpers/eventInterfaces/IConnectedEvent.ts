export interface IConnectedEvent {
    type: 'connected';
    message: {
        wallet: string;
        publicKey: string;
    };
}
