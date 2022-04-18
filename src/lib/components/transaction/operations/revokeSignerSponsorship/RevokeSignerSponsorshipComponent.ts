import type { ITranslation } from 'src/lib/i18n/ITranslation';
import type { Operation, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';
import { getSignerType } from './revokeSignerHelper';

export default class RevokeSignerSponsorshipComponent
    extends AbstractOperationComponent
    implements IOperationComponent
{
    constructor(language: ITranslation, tx: Transaction, operation: Operation.RevokeSignerSponsorship) {
        const signer = getSignerType(operation.signer);
        super({
            title: language.OPERATION_REVOKE_SIGNER_SPONSORSHIP,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.ACCOUNT, value: operation.account },
                { title: language.SIGNER, value: signer },
            ],
        });
    }
}
