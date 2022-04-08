import type { Operation, Transaction } from 'stellar-sdk';
import type IOperationComponent from '../IOperationComponent';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type { ITranslation } from 'src/lib/i18n/ITranslation';

export default class CreatePassiveSellOfferComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.CreatePassiveSellOffer) {
        super({
            title: language.OPERATION_CREATE_PASSIVE_SELL_OFFER,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.SELLING, value: operation.selling.code },
                { title: language.BUYING, value: operation.buying.code },
                { title: language.AMOUNT, value: operation.amount },
                { title: language.PRICE, value: operation.price },
            ],
        });
    }
}
