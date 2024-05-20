import { Operation, Transaction, xdr } from '@stellar/stellar-sdk';

import type { ContractFunctionInfo } from '../../../../soroban/ContractFunctionInfo.interface';
import { getMethodValue } from '../../getMethodValue';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class InvokeHostFunctionComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(
        tx: Transaction,
        operation: Operation.InvokeHostFunction,
        contractID?: string,
        funcTitle?: string,
        funcParameter?: ContractFunctionInfo,
        funcType?: string,
    ) {
        const values =
            funcTitle &&
            operation.func
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
                (funcType && funcType.length >= 1 ? true : undefined) && { title: 'FUNCTION_TYPE', value: funcType },
                (contractID && contractID.length >= 1 ? true : undefined) && {
                    title: 'CONTRACT_ID',
                    value: contractID,
                },
                (funcTitle && funcTitle.length >= 1 ? true : undefined) && { title: 'FUNCTION_NAME', value: funcTitle },
                (funcParameter && values && values!.length >= 1 && funcParameter.inputs.length >= 1
                    ? true
                    : undefined) && {
                    title: 'PARAMETERS',
                    value: funcParameter!.inputs.map((arg, index) => {
                        return `${arg.name} : ${values![index]!.toString().split(' ,')} `;
                    }),
                },
                (funcParameter && funcParameter.description ? true : undefined) && {
                    title: 'DESCRIPTION',
                    value: [funcParameter!.description!],
                },
            ],
        });
    }
}
