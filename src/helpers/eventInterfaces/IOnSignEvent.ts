export interface IOnSignEvent {
    type: 'signed';
    message: {
        signedXdr: string;
    };
}
