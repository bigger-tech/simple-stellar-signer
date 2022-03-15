export default interface ITxParams {
    xdr: string;
    description: string | undefined;
    operationsGroups: { from: number; to: number; description: string }[];
}
