import type { ITranslation } from 'src/lib/i18n/ITranslation';
import { Asset, Operation, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class AllowTrustComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.RevokeTrustlineSponsorship) {
        let asset;
        if (operation.asset instanceof Asset) {
            asset = operation.asset.code;
        } else {
            asset = operation.asset;
        }

        super({
            title: language.OPERATION_REVOKE_TRUSTLINE_SPONSORSHIP,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.ACCOUNT, value: operation.account },
                { title: language.ASSET, value: asset },
            ],
        });
    }
}
