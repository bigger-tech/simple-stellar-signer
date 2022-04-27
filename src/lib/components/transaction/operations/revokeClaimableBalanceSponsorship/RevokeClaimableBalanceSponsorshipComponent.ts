import type { Operation, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class RevokeClaimableBalanceSponsorship
    extends AbstractOperationComponent
    implements IOperationComponent
{
    constructor(tx: Transaction, operation: Operation.RevokeClaimableBalanceSponsorship) {
        super({
            title: 'OPERATION_REVOKE_CLAIMABLE_BALANCE_SPONSORSHIP',
            operationItems: [
                { title: 'SOURCE_ACCOUNT', value: operation.source || tx.source },
                { title: 'BALANCE_ID', value: operation.balanceId },
            ],
        });
    }
}
