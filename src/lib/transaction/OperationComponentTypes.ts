import type { PaymentComponentType } from './operations/payment/Payment';
import type { CreateAccountComponentType } from './operations/createAccount/CreateAccount';
import type { BeginSponsoringFutureReservesComponentType } from './operations/beginSponsoringFutureReserves/BeginSponsoringFutureReserves';

export let OperationComponentTypes:
    | PaymentComponentType
    | CreateAccountComponentType
    | BeginSponsoringFutureReservesComponentType;
