import type { ITranslation } from 'src/lib/i18n/ITranslation';
import type { Operation, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class CreateClaimableBalanceComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.CreateClaimableBalance) {
        const claimantsDestinations = operation.claimants.map((claimant) => claimant.destination);

        super({
            title: language.OPERATION_CREATE_CLAIMABLE_BALANCE,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.AMOUNT, value: operation.amount },
                { title: language.ASSET, value: operation.asset.code },
                { title: language.CLAIMANTS, value: claimantsDestinations },
            ],
        });
    }
}
