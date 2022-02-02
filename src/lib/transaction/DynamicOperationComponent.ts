import type { Operation } from 'stellar-sdk';
import Payment from './operations/payment/Payment';
import CreateAccount from './operations/createAccount/CreateAccount';
import type { OperationComponentTypes } from './OperationComponentTypes';

export default class DynamicOperationComponent {
    create(operation: Operation): typeof OperationComponentTypes {
        let operationComponent;

        switch (operation.type) {
            case 'payment':
                operationComponent = new Payment().createOperation(operation);
                break;
            case 'createAccount':
                operationComponent = new CreateAccount().createOperation(operation);
                break;
            default:
                operationComponent;
                break;
        }

        if (operationComponent) {
            return operationComponent;
        } else {
            throw new Error();
        }
    }
}
