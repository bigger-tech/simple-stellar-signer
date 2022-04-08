import type { Operation, Transaction } from 'stellar-sdk';
import type IOperationComponent from '../IOperationComponent';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type { ITranslation } from 'src/lib/i18n/ITranslation';

export default class RevokeDataSponsorship extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.RevokeDataSponsorship) {
        super({
            title: language.OPERATION_REVOKE_DATA_SPONSORSHIP,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.ACCOUNT, value: operation.account },
                { title: language.NAME, value: operation.name },
            ],
        });
    }
}
