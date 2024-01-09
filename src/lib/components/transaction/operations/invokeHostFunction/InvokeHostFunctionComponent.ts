import type { Operation, Transaction } from 'stellar-sdk';
import { xdr } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class InvokeHostFunctionComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(tx: Transaction, operation: Operation.InvokeHostFunction) {
        const funcValue = operation.func.value();
        let functionType = 'Upload Contract WASM';

        if (funcValue instanceof xdr.InvokeContractArgs) functionType = 'Invoke Contract';
        if (funcValue instanceof xdr.CreateContractArgs) functionType = 'Create Contract';

        super({
            title: 'INVOKE_HOST_FUNCTION',
            operationItems: [
                { title: 'SOURCE_ACCOUNT', value: operation.source || tx.source, translatedValue: 'YOUR_ACCOUNT' },
                { title: 'FUNCTION_TYPE', value: functionType },
            ],
        });
    }
}
