import type { Operation, Transaction } from 'stellar-sdk';
import Payment from './operations/payment/Payment';
import CreateAccount from './operations/createAccount/CreateAccount';
import InvalidComponentTypeError from '../errors/InvalidComponentTypeError';
import type { OperationComponentTypes } from './OperationComponentTypes';
import ManageData from './operations/manageData/ManageData';

export default class DynamicOperationComponentFactory {
    create(tx: Transaction, operation: Operation): typeof OperationComponentTypes {
        let operationComponent;
        console.log(tx);

        switch (operation.type) {
            case 'payment':
                operationComponent = new Payment().createOperation(operation, tx);
                break;
            case 'createAccount':
                operationComponent = new CreateAccount().createOperation(operation, tx);
                break;
            case 'manageData':
                operationComponent = new ManageData().createOperation(operation, tx);
                break;
            default:
                undefined;
                break;
        }

        if (operationComponent) {
            return operationComponent;
        } else {
            throw new InvalidComponentTypeError();
        }
    }
}
