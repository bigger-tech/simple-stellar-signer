import type { Operation, Transaction } from 'stellar-sdk';

import { getContractAddress, getContractMethodsParams } from '../../../soroban/GetContractFunctionInfo';
import { InvokeHostFunction, InvokeHostFunctionType } from '../../../stellar/InvokeHostFunction';
import InvokeHostFunctionComponent from './invokeHostFunction/InvokeHostFunctionComponent';

export class InvokeHostFunctionComponentFactory {
    async create(tx: Transaction, operation: Operation): Promise<InvokeHostFunctionComponent> {
        const invokeHostFunction = operation as Operation.InvokeHostFunction;
        const funcType = invokeHostFunction.func.switch().name;

        if (funcType === InvokeHostFunctionType.InvokeContract) {
            const funcTitle = invokeHostFunction.func.invokeContract().functionName().toString();

            const contractID = getContractAddress(
                invokeHostFunction.func.invokeContract().contractAddress().contractId().toString('hex'),
            );
            const funcParameters = await getContractMethodsParams(contractID, funcTitle);

            return new InvokeHostFunctionComponent(tx, invokeHostFunction, contractID, funcTitle, funcParameters[0]!);
        }

        return new InvokeHostFunctionComponent(
            tx,
            invokeHostFunction,
            undefined,
            undefined,
            undefined,
            funcType === InvokeHostFunctionType.CreateContract
                ? InvokeHostFunction.CreateContract
                : InvokeHostFunction.UploadWasm,
        );
    }
}
