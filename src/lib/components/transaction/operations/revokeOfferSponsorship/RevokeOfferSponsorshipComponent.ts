import type { Operation, Transaction } from 'stellar-sdk';
import type IOperationComponent from '../IOperationComponent';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type { ITranslation } from 'src/lib/i18n/ITranslation';

export default class RevokeOfferSponsorshipComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.RevokeOfferSponsorship) {
        super({
            title: language.OPERATION_REVOKE_OFFER_SPONSORSHIP,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.SELLER, value: operation.seller },
                { title: language.OFFER_ID, value: operation.offerId },
            ],
        });
    }
}
