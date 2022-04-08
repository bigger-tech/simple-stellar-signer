import type { Operation, Transaction } from 'stellar-sdk';
import type IOperationComponent from '../IOperationComponent';
import type { ITranslation } from 'src/lib/i18n/ITranslation';
import AbstractOperationComponent from '../AbstractOperationComponent';
import getValue from './setOptionsHelper';

export default class SetOptionsComponent extends AbstractOperationComponent implements IOperationComponent {
    constructor(language: ITranslation, tx: Transaction, operation: Operation.SetOptions) {
        const signerValue = getValue(operation);

        super({
            title: language.OPERATION_SET_OPTIONS,

            operationItems: [
                { title: language.SOURCE_ACCOUNT, value: operation.source || tx.source },

                operation.inflationDest
                    ? { title: language.DESTINATION_INFLATION, value: operation.inflationDest }
                    : { title: '', value: '' },
                operation.clearFlags
                    ? { title: language.CLEAR_FLAGS, value: operation.clearFlags }
                    : { title: '', value: '' },
                operation.setFlags
                    ? { title: language.SET_FLAGS, value: operation.setFlags }
                    : { title: '', value: '' },
                operation.masterWeight
                    ? { title: language.MASTER_WEIGHT, value: operation.masterWeight }
                    : { title: '', value: '' },
                operation.lowThreshold
                    ? { title: language.LOW_THRESHOLD, value: operation.lowThreshold }
                    : { title: '', value: '' },
                operation.medThreshold
                    ? { title: language.MEDIUM_THRESHOLD, value: operation.medThreshold }
                    : { title: '', value: '' },
                operation.highThreshold
                    ? { title: language.HIGH_THRESHOLD, value: operation.highThreshold }
                    : { title: '', value: '' },
                operation.homeDomain
                    ? { title: language.HOME_DOMAIN, value: operation.homeDomain }
                    : { title: '', value: '' },
                { title: language.SIGNER, value: signerValue },
            ],
        });
    }
}
