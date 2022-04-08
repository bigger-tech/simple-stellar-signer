import type { Operation, Transaction } from 'stellar-sdk';
import type IOperationComponent from '../IOperationComponent';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type { ITranslation } from 'src/lib/i18n/ITranslation';

export default class PathPaymentStrictSendComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.PathPaymentStrictSend) {
        const paths = operation.path.map((path) => path.code);

        super({
            title: language.OPERATION_PATH_PAYMENT_STRICT_RECEIVE,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.ASSET_TO_PAY, value: operation.sendAsset.code },
                { title: language.AMOUNT, value: operation.sendAmount },
                { title: language.DESTINATION, value: operation.destination },
                { title: language.DESTINATION_ASSET, value: operation.destAsset.code },
                { title: language.MINIMUM_AMOUNT_DESTINATION_ASSET, value: operation.destMin },
                { title: language.PATH, value: paths },
            ],
        });
    }
}
