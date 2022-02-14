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
import SetOptionsComponent from './setOptions/SetOptions';
import ChangeTrustComponent from './changeTrust/ChangeTrust';
import AccountMergeComponent from './accountMerge/AccountMerge';
import ManageDataComponent from './manageData/ManageData';
import BumpSequenceComponent from './bumpSequence/BumpSequence';
import CreateClaimableBalanceComponent from './createClaimableBalance/CreateClaimableBalance';
import EndSponsoringFutureReservesComponent from './endSponsoringFutureReserves/EndSponsoringFutureReserves';
import RevokeAccountSponsorshipComponent from './revokeAccountSponsorship/RevokeAccountSponsorship';
import RevokeClaimableBalanceSponsorshipComponent from './revokeClaimableBalanceSponsorship/RevokeClaimableBalanceSponsorship';
import RevokeDataSponsorshipComponent from './revokeDataSponsorship/RevokeDataSponsorship';
import RevokeLiquidityPoolSponsorshipComponent from './revokeLiquidityPoolSponsorship/RevokeLiquidityPoolSponsorship';
import RevokeOfferSponsorshipComponent from './revokeOfferSponsorship/RevokeOfferSponsorship';
import ClawbackComponent from './clawback/Clawback';

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
            case 'setOptions':
                operationComponent = new SetOptionsComponent(tx, operation);
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
            case 'bumpSequence':
                operationComponent = new BumpSequenceComponent(tx, operation);
                break;
            case 'createClaimableBalance':
                operationComponent = new CreateClaimableBalanceComponent(tx, operation);
                break;
            case 'endSponsoringFutureReserves':
                operationComponent = new EndSponsoringFutureReservesComponent(tx, operation);
                break;
            case 'revokeAccountSponsorship' as 'revokeSponsorship':
                operationComponent = new RevokeAccountSponsorshipComponent(
                    tx,
                    operation as Operation.RevokeAccountSponsorship,
                );
                break;
            case 'revokeClaimableBalanceSponsorship' as 'revokeSponsorship':
                operationComponent = new RevokeClaimableBalanceSponsorshipComponent(
                    tx,
                    operation as Operation.RevokeClaimableBalanceSponsorship,
                );
                break;
            case 'revokeDataSponsorship' as 'revokeSponsorship':
                operationComponent = new RevokeDataSponsorshipComponent(
                    tx,
                    operation as Operation.RevokeDataSponsorship,
                );
                break;
            case 'revokeLiquidityPoolSponsorship' as 'revokeSponsorship':
                operationComponent = new RevokeLiquidityPoolSponsorshipComponent(
                    tx,
                    operation as Operation.RevokeLiquidityPoolSponsorship,
                );
                break;
            case 'revokeOfferSponsorship' as 'revokeSponsorship':
                operationComponent = new RevokeOfferSponsorshipComponent(
                    tx,
                    operation as Operation.RevokeOfferSponsorship,
                );
                break;
            case 'clawback':
                operationComponent = new ClawbackComponent(tx, operation);
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
