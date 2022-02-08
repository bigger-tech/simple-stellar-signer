import type { Operation, Transaction } from 'stellar-sdk';
import PaymentComponent from './payment/Payment';
import CreateAccountComponent from './createAccount/CreateAccount';
import InvalidComponentTypeError from '../../errors/InvalidComponentTypeError';
import type { OperationComponentTypes } from './OperationComponentTypes';
import BeginSponsoringFutureReservesComponent from './beginSponsoringFutureReserves/BeginSponsoringFutureReserves';

export default class DynamicOperationComponentFactory {
    create(tx: Transaction, operation: Operation): typeof OperationComponentTypes {
        let operationComponent;

        switch (operation.type) {
            case 'payment':
                operationComponent = new PaymentComponent(tx, operation);
                break;
            case 'createAccount':
                operationComponent = new CreateAccountComponent(tx, operation);
                break;
            case 'beginSponsoringFutureReserves':
                operationComponent = new BeginSponsoringFutureReservesComponent(tx, operation);
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
