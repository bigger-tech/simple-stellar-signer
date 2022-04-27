import type { Operation as OperationType, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class PaymentComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(tx: Transaction, operation: OperationType.Payment) {
        super({
            title: 'OPERATION_PAYMENT',
            operationItems: [
                { title: 'SOURCE_ACCOUNT', value: operation.source || tx.source },
                { title: 'AMOUNT', value: operation.amount },
                { title: 'ASSET', value: operation.asset.code },
                { title: 'DESTINATION', value: operation.destination },
            ],
        });
    }
}
