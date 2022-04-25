import type { ITranslation } from 'src/lib/i18n/ITranslation';
import type { Operation, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class RevokeLiquidityPoolSponsorship extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.RevokeLiquidityPoolSponsorship) {
        super({
            title: language.OPERATION_REVOKE_LIQUIDITY_POOL_SPONSORSHIP,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // Bug in the types of the operation in stellar-base
                { title: language.LIQUIDITY_POOL_ID, value: operation.liquidityPoolId },
            ],
        });
    }
}
