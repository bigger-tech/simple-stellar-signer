import type { LiquidityPoolId } from 'stellar-sdk';

export default interface IOperationComponentProps {
    title: string;
    operationItems: {
        title: string;
        value: string | string[] | number | LiquidityPoolId | Buffer | (string | number)[] | (string | Buffer)[];
    }[];
}
