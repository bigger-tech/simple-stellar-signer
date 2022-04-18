import type { ITranslation } from 'src/lib/i18n/ITranslation';
import type { Operation, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class PathPaymentStrictReceiveComponent
    extends AbstractOperationComponent
    implements IOperationComponent
{
    constructor(language: ITranslation, tx: Transaction, operation: Operation.PathPaymentStrictReceive) {
        const paths = operation.path.map((path) => path.code);

        super({
            title: language.OPERATION_PATH_PAYMENT_STRICT_RECEIVE,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.ASSET_TO_PAY, value: operation.sendAsset.code },
                { title: language.MAX_AMOUNT, value: operation.sendMax },
                { title: language.DESTINATION, value: operation.destination },
                { title: language.DESTINATION_ASSET, value: operation.destAsset.code },
                { title: language.AMOUNT, value: operation.destAmount },
                { title: language.PATH, value: paths },
            ],
        });
    }
}
