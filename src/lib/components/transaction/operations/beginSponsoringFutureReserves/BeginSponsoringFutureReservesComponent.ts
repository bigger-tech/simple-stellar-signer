import type { Operation, Transaction } from 'stellar-sdk';
import type IOperationComponent from '../IOperationComponent';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type { ITranslation } from 'src/lib/i18n/ITranslation';

export default class BeginSponsoringFutureReservesComponent
    extends AbstractOperationComponent
    implements IOperationComponent
{
    constructor(language: ITranslation, tx: Transaction, operation: Operation.BeginSponsoringFutureReserves) {
        super({
            title: language.OPERATION_BEGIN_SPONSORING_FUTURE_RESERVES,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.SPONSORED_ID, value: operation.sponsoredId },
            ],
        });
    }
}
