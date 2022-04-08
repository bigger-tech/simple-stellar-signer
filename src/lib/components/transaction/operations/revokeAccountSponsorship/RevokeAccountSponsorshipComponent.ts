import type { Operation, Transaction } from 'stellar-sdk';
import type IOperationComponent from '../IOperationComponent';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type { ITranslation } from 'src/lib/i18n/ITranslation';

export default class RevokeAccountSponsorship extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.RevokeAccountSponsorship) {
        super({
            title: language.OPERATION_REVOKE_ACCOUNT_SPONSORSHIP,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.ACCOUNT, value: operation.account },
            ],
        });
    }
}
