import type { ITranslation } from 'src/lib/i18n/ITranslation';
import type { Operation, Transaction } from 'stellar-sdk';
import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class SetTrustLineFlags extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.SetTrustLineFlags) {
        super({
            title: language.OPERATION_SET_TRUSTLINE_FLAGS,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.TRUSTOR, value: operation.trustor },
                { title: language.ASSET, value: operation.asset.code },
                { title: language.IS_AUTHORIZED, value: operation.flags.authorized ? 'True' : 'False' },
                {
                    title: language.IS_AUTHORIZED_TO_MAINTAIN_LIABILITIES,
                    value: operation.flags.authorizedToMaintainLiabilities ? 'True' : 'False',
                },
                { title: language.IS_CLAWBACK_ENABLED, value: operation.flags.clawbackEnabled ? 'True' : 'False' },
            ],
        });
    }
}
