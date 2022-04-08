import type { Operation, Transaction } from 'stellar-sdk';
import type IOperationComponent from '../IOperationComponent';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type { ITranslation } from 'src/lib/i18n/ITranslation';

export default class AllowTrustComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.AllowTrust) {
        let authorization;

        if (operation.authorize === 2) {
            authorization = language.AUTHORIZED_TO_MAINTAIN_ORDERS;
        } else if (operation.authorize) {
            authorization = language.AUTHORIZED_TO_TRANSACT;
        } else {
            authorization = language.NOT_AUTHORIZED_TO_TRANSACT;
        }

        super({
            title: operation.authorize ? language.ALLOW_TRUST : language.DISALLOW_TRUST,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.ASSET, value: operation.assetCode },
                { title: '', value: authorization },
            ],
        });
    }
}
