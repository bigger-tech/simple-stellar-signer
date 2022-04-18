import type { ITranslation } from 'src/lib/i18n/ITranslation';
import type { Operation, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class EndSponsoringFutureReservesComponent
    extends AbstractOperationComponent
    implements IOperationComponent
{
    constructor(language: ITranslation, tx: Transaction, operation: Operation.EndSponsoringFutureReserves) {
        super({
            title: language.OPERATION_END_SPONSORING_FUTURE_RESERVES,
            operationItems: [{ title: language.SOURCE_ACCOUNT, value: operation.source || tx.source }],
        });
    }
}
