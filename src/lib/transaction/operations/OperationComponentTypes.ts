import type PaymentComponent from './payment/Payment';
import type CreateAccountComponent from './createAccount/CreateAccount';
import type BeginSponsoringFutureReservesComponent from './beginSponsoringFutureReserves/BeginSponsoringFutureReserves';
import type PathPaymentStrictSendComponent from './pathPaymentStrictSend/PathPaymentStrictSend';
import type PathPaymentStrictReceiveComponent from './pathPaymentStrictReceive/PathPaymentStrictReceive';

export let OperationComponentTypes:
    | PaymentComponent
    | CreateAccountComponent
    | BeginSponsoringFutureReservesComponent
    | PathPaymentStrictSendComponent
    | PathPaymentStrictReceiveComponent;
