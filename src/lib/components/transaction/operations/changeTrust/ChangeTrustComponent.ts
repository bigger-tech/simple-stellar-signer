import { Asset, Operation, Transaction } from 'stellar-sdk';
import type IOperationComponent from '../IOperationComponent';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type { ITranslation } from 'src/lib/i18n/ITranslation';

export default class ChangeTrustComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.ChangeTrust) {
        let items: { title: string; value: string }[];

        if (operation.line instanceof Asset) {
            items = [{ title: language.ASSET, value: operation.line.code }];
        } else {
            items = [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.ASSET_A, value: operation.line.assetA.code },
                { title: language.ASSET_B, value: operation.line.assetB.code },
            ];
        }

        items.unshift({ title: language.SOURCE_ACCOUNT, value: operation.source || tx.source });
        items.push({ title: language.LIMIT, value: operation.limit });

        super({
            title: language.OPERATION_CHANGE_TRUST,
            operationItems: items,
        });
    }
}
