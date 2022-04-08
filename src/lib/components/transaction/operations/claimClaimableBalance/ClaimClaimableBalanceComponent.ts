import type { Operation, Transaction } from 'stellar-sdk';
import type IOperationComponent from '../IOperationComponent';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type { ITranslation } from 'src/lib/i18n/ITranslation';

export default class ClaimClaimableBalanceComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.ClaimClaimableBalance) {
        super({
            title: language.OPERATION_CLAIM_CLAIMABLE_BALANCE,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.BALANCE_ID, value: operation.balanceId },
            ],
        });
    }
}
