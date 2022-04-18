import type { ITranslation } from 'src/lib/i18n/ITranslation';
import type { Operation, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class ManageBuyOfferComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.ManageBuyOffer) {
        super({
            title: language.OPERATION_MANAGE_BUY_OFFER,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.SELLING_ASSET, value: operation.selling.code },
                { title: language.BUYING_ASSET, value: operation.buying.code },
                { title: language.BUY_AMOUNT, value: operation.buyAmount },
                { title: language.PRICE, value: operation.price },
                { title: language.OFFER_ID, value: operation.offerId },
            ],
        });
    }
}
