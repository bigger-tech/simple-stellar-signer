import type { Operation, Transaction } from 'stellar-sdk';
import type IOperationComponent from '../IOperationComponent';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type { ITranslation } from 'src/lib/i18n/ITranslation';

export default class RevokeClaimableBalanceSponsorship
    extends AbstractOperationComponent
    implements IOperationComponent
{
    constructor(language: ITranslation, tx: Transaction, operation: Operation.RevokeClaimableBalanceSponsorship) {
        super({
            title: language.OPERATION_REVOKE_CLAIMABLE_BALANCE_SPONSORSHIP,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.BALANCE_ID, value: operation.balanceId },
            ],
        });
    }
}
