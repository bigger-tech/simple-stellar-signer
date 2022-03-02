export default interface IOnConnectEvent {
    type: 'connected';
    message: {
        wallet: string;
        publicKey: string;
    };
}
