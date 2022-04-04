import type AccountMergeComponent from './accountMerge/AccountMergeComponent';
import type AllowTrustComponent from './allowTrust/AllowTrustComponent';
import type BeginSponsoringFutureReservesComponent from './beginSponsoringFutureReserves/BeginSponsoringFutureReservesComponent';
import type BumpSequenceComponent from './bumpSequence/BumpSequenceComponent';
import type ChangeTrustComponent from './changeTrust/ChangeTrustComponent';
import type ClaimClaimableBalanceComponent from './claimClaimableBalance/ClaimClaimableBalanceComponent';
import type ClawbackComponent from './clawback/ClawbackComponent';
import type ClawbackClaimableBalanceComponent from './clawbackClaimableBalance/ClawbackClaimableBalanceComponent';
import type CreateAccountComponent from './createAccount/CreateAccountComponent';
import type CreateClaimableBalanceComponent from './createClaimableBalance/CreateClaimableBalanceComponent';
import type CreatePassiveSellOfferComponent from './createPassiveSellOffer/CreatePassiveSellOfferComponent';
import type EndSponsoringFutureReservesComponent from './endSponsoringFutureReserves/EndSponsoringFutureReservesComponent';
import type LiquidityPoolDepositComponent from './liquidityPoolDeposit/LiquidityPoolDepositComponent';
import type LiquidityPoolWithdrawComponent from './liquidityPoolWithdraw/LiquidityPoolWithdrawComponent';
import type ManageBuyOfferComponent from './manageBuyOffer/ManageBuyOfferComponent';
import type ManageDataComponent from './manageData/ManageDataComponent';
import type ManageSellOfferComponent from './manageSellOffer/ManageSellOfferComponent';
import type PathPaymentStrictReceiveComponent from './pathPaymentStrictReceive/PathPaymentStrictReceiveComponent';
import type PathPaymentStrictSendComponent from './pathPaymentStrictSend/PathPaymentStrictSendComponent';
import type PaymentComponent from './payment/PaymentComponent';
import type RevokeAccountSponsorshipComponent from './revokeAccountSponsorship/RevokeAccountSponsorshipComponent';
import type RevokeClaimableBalanceSponsorshipComponent from './revokeClaimableBalanceSponsorship/RevokeClaimableBalanceSponsorshipComponent';
import type RevokeDataSponsorshipComponent from './revokeDataSponsorship/RevokeDataSponsorshipComponent';
import type RevokeLiquidityPoolSponsorshipComponent from './revokeLiquidityPoolSponsorship/RevokeLiquidityPoolSponsorshipComponent';
import type RevokeOfferSponsorshipComponent from './revokeOfferSponsorship/RevokeOfferSponsorshipComponent';
import type RevokeSignerSponsorshipComponent from './revokeSignerSponsorship/RevokeSignerSponsorshipComponent';
import type RevokeTrustlineSponsorshipComponent from './revokeTrustLineSponsorship/RevokeTrustLineSponsorshipComponent';
import type SetOptionsComponent from './setOptions/SetOptionsComponent';
import type SetTrustLineFlagsComponent from './setTrustLineFlags/SetTrustLineFlagsComponent';

export type OperationComponent =
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
