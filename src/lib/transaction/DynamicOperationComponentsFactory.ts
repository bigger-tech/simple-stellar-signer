import type { Operation, Transaction } from 'stellar-sdk';
import Payment from './operations/payment/Payment';
import CreateAccount from './operations/createAccount/CreateAccount';
import InvalidComponentTypeError from '../errors/InvalidComponentTypeError';
import type { OperationComponentTypes } from './OperationComponentTypes';

export default class DynamicOperationComponentFactory {
    tx: Transaction;

    constructor(tx: Transaction) {
        this.tx = tx;
    }

    create(): typeof OperationComponentTypes[] {
        const operationComponents: typeof OperationComponentTypes[] = [];

        for (let i = 0; i < this.tx.operations.length; i++) {
            switch (this.tx.operations[i]!.type) {
                case 'payment':
                    operationComponents.push(
                        new Payment().createOperation(this.tx.operations[i]! as Operation.Payment),
                    );
                    break;
                case 'createAccount':
                    operationComponents.push(
                        new CreateAccount().createOperation(this.tx.operations[i]! as Operation.CreateAccount, this.tx),
                    );
                    break;
                default:
                    operationComponents;
                    break;
            }
        }

        if (operationComponents) {
            return operationComponents;
        } else {
            throw new InvalidComponentTypeError();
        }
    }
}
