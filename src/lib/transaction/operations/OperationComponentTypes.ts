import type PaymentComponent from './payment/Payment';
import type CreateAccountComponent from './createAccount/CreateAccount';
import type BeginSponsoringFutureReservesComponent from './beginSponsoringFutureReserves/BeginSponsoringFutureReserves';
import type PathPaymentStrictSendComponent from './pathPaymentStrictSend/PathPaymentStrictSend';
import type PathPaymentStrictReceiveComponent from './pathPaymentStrictReceive/PathPaymentStrictReceive';
import type ManageBuyOfferComponent from './manageBuyOffer/ManageBuyOffer';
import type ManageSellOfferComponent from './manageSellOffer/ManageSellOffer';
import type CreatePassiveSellOfferComponent from './createPassiveSellOffer/CreatePassiveSellOffer';
import type ChangeTrustComponent from './changeTrust/ChangeTrust';
import type AccountMergeComponent from './accountMerge/AccountMerge';

export let OperationComponentTypes:
    | PaymentComponent
    | CreateAccountComponent
    | BeginSponsoringFutureReservesComponent
    | PathPaymentStrictSendComponent
    | PathPaymentStrictReceiveComponent
    | ManageBuyOfferComponent
    | ManageSellOfferComponent
    | CreatePassiveSellOfferComponent
    | ChangeTrustComponent
    | AccountMergeComponent;
