export default interface ITxParams {
    xdr: string;
    description: string | undefined;
    operationsDescription: { from: number; to: number; description: string }[];
}
