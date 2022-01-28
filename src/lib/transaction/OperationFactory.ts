import type { Operation } from 'stellar-sdk';
// import type IDynamicOperationComponent from './IDynamicOperationComponent';
import Payment from './operations/PaymentClass';
import CreateAccount from './operations/CreateAccountClass';

export default class OperationFactory {
    create(operation: Operation) {
        let operationClass;

        switch (operation.type) {
            case 'payment':
                operationClass = new Payment().createPayment(operation);
                break;
            case 'createAccount':
                operationClass = new CreateAccount().createCreateAccount(operation);
                break;
            default:
                operationClass;
        }

        return operationClass;
    }
}
