export interface ISignedEvent {
    type: 'signed';
    message: {
        signedXdr: string;
    };
}
