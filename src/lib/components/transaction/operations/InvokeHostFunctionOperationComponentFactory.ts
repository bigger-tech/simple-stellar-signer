import type { Operation, Transaction } from 'stellar-sdk';

import { getContractAddress, getContractMethodsParams } from '../../../soroban/GetContractFunctionInfo';
import InvokeHostFunctionComponent from './invokeHostFunction/InvokeHostFunctionComponent';

export class InvokeHostFunctionComponentFactory {
    async create(tx: Transaction, operation: Operation): Promise<InvokeHostFunctionComponent> {
        const funcTitle = (operation as Operation.InvokeHostFunction).func.invokeContract().functionName().toString();
        const contractID = getContractAddress(
            (operation as Operation.InvokeHostFunction).func
                .invokeContract()
                .contractAddress()
                .contractId()
                .toString('hex'),
        );
        const funcParameters = await getContractMethodsParams(contractID, funcTitle);

        const operationComponent = new InvokeHostFunctionComponent(
            tx,
            operation as Operation.InvokeHostFunction,
            contractID,
            funcTitle,
            funcParameters[0]!,
        );

        return operationComponent;
    }
}
