import type { Operation, Transaction } from 'stellar-sdk';
import type IOperationComponent from '../IOperationComponent';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type { ITranslation } from 'src/lib/i18n/ITranslation';

export default class ManageSellOfferComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.ManageSellOffer) {
        super({
            title: language.OPERATION_MANAGE_SELL_OFFER,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.SELLING_ASSET, value: operation.selling.code },
                { title: language.BUYING_ASSET, value: operation.buying.code },
                { title: language.AMOUNT, value: operation.amount },
                { title: language.PRICE, value: operation.price },
                { title: language.OFFER_ID, value: operation.offerId },
            ],
        });
    }
}
