import type { Operation, Transaction } from 'stellar-sdk';
import { xdr } from 'stellar-sdk';

import { InvokeHostFunction } from '../../../../../lib/stellar/InvokeHostFunction';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class InvokeHostFunctionComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(tx: Transaction, operation: Operation.InvokeHostFunction) {
        const funcValue = operation.func.value();
        let functionType = InvokeHostFunction.UploadWasm;

        if (funcValue instanceof xdr.InvokeContractArgs) functionType = InvokeHostFunction.InvokeContract;
        if (funcValue instanceof xdr.CreateContractArgs) functionType = InvokeHostFunction.CreateContract;

        super({
            title: 'OPERATION_INVOKE_HOST_FUNCTION',
            operationItems: [
                { title: 'SOURCE_ACCOUNT', value: operation.source || tx.source, translatedValue: 'YOUR_ACCOUNT' },
                { title: 'FUNCTION_TYPE', value: functionType },
            ],
        });
    }
}
