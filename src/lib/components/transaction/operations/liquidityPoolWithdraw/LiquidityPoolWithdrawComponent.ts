import type { ITranslation } from 'src/lib/i18n/ITranslation';
import type { Operation, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class LiquidityPoolWithdrawComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.LiquidityPoolWithdraw) {
        super({
            title: language.OPERATION_LIQUIDITY_POOL_WITHDRAW,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.LIQUIDITY_POOL_ID, value: operation.liquidityPoolId },
                { title: language.AMOUNT, value: operation.amount },
                { title: language.MIN_AMOUNT_A, value: operation.minAmountA },
                { title: language.MIN_AMOUNT_B, value: operation.minAmountB },
            ],
        });
    }
}
