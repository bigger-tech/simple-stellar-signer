export default interface IOnConnectEvent {
    type: 'onConnect';
    message: {
        wallet: string;
        publicKey: string;
    };
}
