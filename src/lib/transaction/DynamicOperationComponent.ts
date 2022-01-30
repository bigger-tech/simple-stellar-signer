import type { Operation } from 'stellar-sdk';
import Payment from './operations/payment/Payment';
import CreateAccount from './operations/createAccount/CreateAccount';

export default class DynamicOperationComponent {
    create(operation: Operation) {
        let operationClass;

        switch (operation.type) {
            case 'payment':
                operationClass = new Payment().createOperation(operation);
                break;
            case 'createAccount':
                operationClass = new CreateAccount().createOperation(operation);
                break;
            default:
                operationClass;
        }

        return operationClass;
    }
}
