import type PaymentComponent from './payment/PaymentComponent';
import type CreateAccountComponent from './createAccount/CreateAccountComponent';
import type BeginSponsoringFutureReservesComponent from './beginSponsoringFutureReserves/BeginSponsoringFutureReservesComponent';
import type PathPaymentStrictSendComponent from './pathPaymentStrictSend/PathPaymentStrictSendComponent';
import type PathPaymentStrictReceiveComponent from './pathPaymentStrictReceive/PathPaymentStrictReceiveComponent';
import type ManageBuyOfferComponent from './manageBuyOffer/ManageBuyOfferComponent';
import type ManageSellOfferComponent from './manageSellOffer/ManageSellOfferComponent';
import type CreatePassiveSellOfferComponent from './createPassiveSellOffer/CreatePassiveSellOfferComponent';
import type SetOptionsComponent from './setOptions/SetOptionsComponent';
import type ChangeTrustComponent from './changeTrust/ChangeTrustComponent';
import type AccountMergeComponent from './accountMerge/AccountMergeComponent';
import type ManageDataComponent from './manageData/ManageDataComponent';
import type BumpSequenceComponent from './bumpSequence/BumpSequenceComponent';
import type CreateClaimableBalanceComponent from './createClaimableBalance/CreateClaimableBalanceComponent';
import type EndSponsoringFutureReservesComponent from './endSponsoringFutureReserves/EndSponsoringFutureReservesComponent';
import type RevokeAccountSponsorshipComponent from './revokeAccountSponsorship/RevokeAccountSponsorshipComponent';
import type RevokeClaimableBalanceSponsorshipComponent from './revokeClaimableBalanceSponsorship/RevokeClaimableBalanceSponsorshipComponent';
import type RevokeDataSponsorshipComponent from './revokeDataSponsorship/RevokeDataSponsorshipComponent';
import type RevokeLiquidityPoolSponsorshipComponent from './revokeLiquidityPoolSponsorship/RevokeLiquidityPoolSponsorshipComponent';
import type RevokeOfferSponsorshipComponent from './revokeOfferSponsorship/RevokeOfferSponsorshipComponent';
import type RevokeSignerSponsorshipComponent from './revokeSignerSponsorship/RevokeSignerSponsorshipComponent';
import type AllowTrustComponent from './allowTrust/AllowTrustComponent';
import type ClaimClaimableBalanceComponent from './claimClaimableBalance/ClaimClaimableBalanceComponent';
import type ClawbackComponent from './clawback/ClawbackComponent';
import type SetTrustLineFlagsComponent from './setTrustLineFlags/SetTrustLineFlagsComponent';
import type LiquidityPoolWithdrawComponent from './liquidityPoolWithdraw/LiquidityPoolWithdrawComponent';
import type LiquidityPoolDepositComponent from './liquidityPoolDeposit/LiquidityPoolDepositComponent';
import type RevokeTrustlineSponsorshipComponent from './revokeTrustLineSponsorship/RevokeTrustLineSponsorshipComponent';
import type ClawbackClaimableBalanceComponent from './clawbackClaimableBalance/ClawbackClaimableBalanceComponent';

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
    | BumpSequenceComponent
    | CreateClaimableBalanceComponent
    | EndSponsoringFutureReservesComponent
    | RevokeAccountSponsorshipComponent
    | RevokeClaimableBalanceSponsorshipComponent
    | RevokeDataSponsorshipComponent
    | RevokeLiquidityPoolSponsorshipComponent
    | RevokeOfferSponsorshipComponent
    | RevokeSignerSponsorshipComponent
    | AllowTrustComponent
    | ClaimClaimableBalanceComponent
    | ClawbackComponent
    | SetTrustLineFlagsComponent
    | LiquidityPoolWithdrawComponent
    | LiquidityPoolDepositComponent
    | RevokeTrustlineSponsorshipComponent
    | ClawbackClaimableBalanceComponent;
