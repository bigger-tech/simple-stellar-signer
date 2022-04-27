import type { Operation, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class ClawbackComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(tx: Transaction, operation: Operation.Clawback) {
        super({
            title: 'OPERATION_CLAWBACK',
            operationItems: [
                { title: 'SOURCE_ACCOUNT', value: operation.source || tx.source },
                { title: 'ASSET', value: operation.asset.code },
                { title: 'AMOUNT', value: operation.amount },
                { title: 'FROM', value: operation.from },
            ],
        });
    }
}
