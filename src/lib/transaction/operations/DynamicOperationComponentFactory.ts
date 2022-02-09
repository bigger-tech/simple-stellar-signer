import type { Operation, Transaction } from 'stellar-sdk';
import PaymentComponent from './payment/Payment';
import CreateAccountComponent from './createAccount/CreateAccount';
import InvalidComponentTypeError from '../../errors/InvalidComponentTypeError';
import type { OperationComponentTypes } from './OperationComponentTypes';
import BeginSponsoringFutureReservesComponent from './beginSponsoringFutureReserves/BeginSponsoringFutureReserves';
import PathPaymentStrictSendComponent from './pathPaymentStrictSend/PathPaymentStrictSend';
import PathPaymentStrictReceiveComponent from './pathPaymentStrictReceive/PathPaymentStrictReceive';
import ManageBuyOfferComponent from './manageBuyOffer/ManageBuyOffer';
import ManageSellOfferComponent from './manageSellOffer/ManageSellOffer';
import CreatePassiveSellOfferComponent from './createPassiveSellOffer/CreatePassiveSellOffer';
import ChangeTrustComponent from './changeTrust/ChangeTrust';
import AccountMergeComponent from './accountMerge/AccountMerge';
import ManageDataComponent from './manageData/ManageData';

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
            case 'pathPaymentStrictSend':
                operationComponent = new PathPaymentStrictSendComponent(tx, operation);
                break;
            case 'pathPaymentStrictReceive':
                operationComponent = new PathPaymentStrictReceiveComponent(tx, operation);
                break;
            case 'manageBuyOffer':
                operationComponent = new ManageBuyOfferComponent(tx, operation);
                break;
            case 'manageSellOffer':
                operationComponent = new ManageSellOfferComponent(tx, operation);
                break;
            case 'createPassiveSellOffer':
                operationComponent = new CreatePassiveSellOfferComponent(tx, operation);
                break;
            case 'changeTrust':
                operationComponent = new ChangeTrustComponent(tx, operation);
                break;
            case 'accountMerge':
                operationComponent = new AccountMergeComponent(tx, operation);
                break;
            case 'manageData':
                operationComponent = new ManageDataComponent(tx, operation);
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
