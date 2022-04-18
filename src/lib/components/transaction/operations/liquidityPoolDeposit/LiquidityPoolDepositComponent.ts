import type { ITranslation } from 'src/lib/i18n/ITranslation';
import type { Operation, Transaction } from 'stellar-sdk';

import AbstractOperationComponent from '../AbstractOperationComponent';
import type IOperationComponent from '../IOperationComponent';

export default class LiquidityPoolDepositComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.LiquidityPoolDeposit) {
        super({
            title: language.OPERATION_LIQUIDITY_POOL_DEPOSIT,
            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },
                { title: language.LIQUIDITY_POOL_ID, value: operation.liquidityPoolId },
                { title: language.MAX_AMOUNT_A, value: operation.maxAmountA },
                { title: language.MAX_AMOUNT_B, value: operation.maxAmountB },
                { title: language.MINIMUM_PRICE, value: operation.minPrice },
                { title: language.MAXIMUM_PRICE, value: operation.maxPrice },
            ],
        });
    }
}
