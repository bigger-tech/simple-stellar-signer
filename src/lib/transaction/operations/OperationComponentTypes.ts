import type PaymentComponent from './payment/Payment';
import type CreateAccountComponent from './createAccount/CreateAccount';
import type BeginSponsoringFutureReservesComponent from './beginSponsoringFutureReserves/BeginSponsoringFutureReserves';
import type PathPaymentStrictSendComponent from './pathPaymentStrictSend/PathPaymentStrictSend';
import type PathPaymentStrictReceiveComponent from './pathPaymentStrictReceive/PathPaymentStrictReceive';
import type ManageBuyOfferComponent from './manageBuyOffer/ManageBuyOffer';
import type ManageSellOfferComponent from './manageSellOffer/ManageSellOffer';
import type CreatePassiveSellOfferComponent from './createPassiveSellOffer/CreatePassiveSellOffer';
import type SetOptionsComponent from './setOptions/SetOptions';
import type ChangeTrustComponent from './changeTrust/ChangeTrust';
import type AccountMergeComponent from './accountMerge/AccountMerge';
import type ManageDataComponent from './manageData/ManageData';
import type BumpSequenceComponent from './bumpSequence/BumpSequence';

export let OperationComponentTypes:
    | PaymentComponent
    | CreateAccountComponent
    | BeginSponsoringFutureReservesComponent
    | PathPaymentStrictSendComponent
    | PathPaymentStrictReceiveComponent
    | ManageBuyOfferComponent
    | ManageSellOfferComponent
    | CreatePassiveSellOfferComponent
    | SetOptionsComponent
    | ChangeTrustComponent
    | AccountMergeComponent
    | ManageDataComponent
    | BumpSequenceComponent;
