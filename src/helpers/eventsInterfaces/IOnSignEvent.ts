export default interface IOnSignEvent {
    type: 'onSign';
    message: {
        signedXDR: string;
    };
}
