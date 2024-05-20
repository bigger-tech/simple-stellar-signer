import { Operation, Transaction, xdr } from '@stellar/stellar-sdk';

import type { ContractFunctionInfo } from '../../../../soroban/ContractFunctionInfo.interface';
import { getMethodParamsValue } from '../../getMethodParamsValue';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class InvokeHostFunctionComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(
        tx: Transaction,
        operation: Operation.InvokeHostFunction,
        contractId?: string,
        title?: string,
        parameter?: ContractFunctionInfo,
        type?: string,
    ) {
        const values =
            title &&
            operation.func
                .invokeContract()
                .args()
                .map((arg) => {
                    const paramsValue = getMethodParamsValue(arg, arg.switch().name);

                    if (paramsValue instanceof xdr.ScVal) return paramsValue.value();

                    return paramsValue;
                });

        super({
            title: 'OPERATION_INVOKE_HOST_FUNCTION',
            operationItems: [
                { title: 'SOURCE_ACCOUNT', value: operation.source || tx.source, translatedValue: 'YOUR_ACCOUNT' },
                (type && type.length >= 1 ? true : undefined) && { title: 'FUNCTION_TYPE', value: type },
                (contractId && contractId.length >= 1 ? true : undefined) && {
                    title: 'CONTRACT_ID',
                    value: contractId,
                },
                (title && title.length >= 1 ? true : undefined) && { title: 'FUNCTION_NAME', value: title },
                (parameter && values && values!.length >= 1 && parameter.inputs.length >= 1 ? true : undefined) && {
                    title: 'PARAMETERS',
                    value: parameter!.inputs.map((arg, index) => {
                        return `${arg.name} : ${values![index]!.toString().split(' ,')} `;
                    }),
                },
                (parameter && parameter.description ? true : undefined) && {
                    title: 'DESCRIPTION',
                    value: [parameter!.description!],
                },
            ],
        });
    }
}
