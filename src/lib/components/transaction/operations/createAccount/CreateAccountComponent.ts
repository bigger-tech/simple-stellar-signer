import type { Operation, Transaction } from 'stellar-sdk';
import type { ITranslation } from 'src/lib/i18n/ITranslation';
import type IOperationComponent from '../IOperationComponent';
import AbstractOperationComponent from '../AbstractOperationComponent';

export default class CreateAccountComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.CreateAccount) {
        super({
            title: language.OPERATION_CREATE_ACCOUNT,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.DESTINATION, value: operation.destination },
                { title: language.STARTING_BALANCE, value: operation.startingBalance },
            ],
        });
    }
}
