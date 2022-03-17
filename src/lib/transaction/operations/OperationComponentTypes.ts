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
import type CreateClaimableBalanceComponent from './createClaimableBalance/CreateClaimableBalance';
import type EndSponsoringFutureReservesComponent from './endSponsoringFutureReserves/EndSponsoringFutureReserves';
import type RevokeAccountSponsorshipComponent from './revokeAccountSponsorship/RevokeAccountSponsorship';
import type RevokeClaimableBalanceSponsorshipComponent from './revokeClaimableBalanceSponsorship/RevokeClaimableBalanceSponsorship';
import type RevokeDataSponsorshipComponent from './revokeDataSponsorship/RevokeDataSponsorship';
import type RevokeLiquidityPoolSponsorshipComponent from './revokeLiquidityPoolSponsorship/RevokeLiquidityPoolSponsorship';
import type RevokeOfferSponsorshipComponent from './revokeOfferSponsorship/RevokeOfferSponsorship';
import type RevokeSignerSponsorshipComponent from './revokeSignerSponsorship/RevokeSignerSponsorship';
import type AllowTrustComponent from './allowTrust/AllowTrust';
import type ClaimClaimableBalanceComponent from './claimClaimableBalance/ClaimClaimableBalance';
import type ClawbackComponent from './clawback/Clawback';
import type SetTrustLineFlagsComponent from './setTrustLineFlags/SetTrustLineFlags';
import type LiquidityPoolWithdrawComponent from './liquidityPoolWithdraw/LiquidityPoolWithdraw';
import type LiquidityPoolDepositComponent from './liquidityPoolDeposit/LiquidityPoolDeposit';
import type RevokeTrustlineSponsorshipComponent from './revokeTrustLineSponsorship/RevokeTrustLineSponsorship';
import type ClawbackClaimableBalanceComponent from './clawbackClaimableBalance/ClawbackClaimableBalance';

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
