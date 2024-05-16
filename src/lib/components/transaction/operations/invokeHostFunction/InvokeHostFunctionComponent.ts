import { Operation, Transaction, xdr } from '@stellar/stellar-sdk';

import type { ContractFunctionInfo } from '../../../../soroban/ContractFunctionInfo.interface';
import { getMethodValue } from '../../getMethodValue';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class InvokeHostFunctionComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(
        tx: Transaction,
        operation: Operation.InvokeHostFunction,
        funcParameter: ContractFunctionInfo,
        funcTitle: string,
        contractID: string,
    ) {
        const values = operation.func
            .invokeContract()
            .args()
            .map((arg) => {
                const methodValue = getMethodValue(arg, arg.switch().name);

                if (methodValue instanceof xdr.ScVal) return methodValue.value();

                return methodValue;
            });

        super({
            title: 'OPERATION_INVOKE_HOST_FUNCTION',
            operationItems: [
                { title: 'SOURCE_ACCOUNT', value: operation.source || tx.source, translatedValue: 'YOUR_ACCOUNT' },
                { title: 'CONTRACT_ID', value: contractID },
                { title: 'FUNCTION_NAME', value: funcTitle },
                (funcParameter.description ? true : undefined) && {
                    title: 'DESCRIPTION',
                    value: [funcParameter.description!],
                },
                (funcParameter.inputs.length >= 1 ? true : undefined) && {
                    title: 'PARAMETERS',
                    value: funcParameter?.inputs.map((arg, index) => {
                        return `${arg.name} : ${values[index]!.toString().split(' ,')} `;
                    }),
                },
            ],
        });
    }
}
