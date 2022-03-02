export default interface IOnSignEvent {
    type: 'signed';
    message: {
        signedXDR: string;
    };
}
