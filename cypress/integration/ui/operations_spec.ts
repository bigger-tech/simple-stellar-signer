/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>
import {
    accountMergeXdr,
    allowTrustXdr,
    beginSponsoringFutureReservesXdr,
    bumpSequenceXdr,
    changeTrustLiquidityPoolAssetXdr,
    changeTrustXdr,
    claimClaimableBalanceXdr,
    clawbackClaimableBalanceXdr,
    clawbackXdr,
    createAccountXdr,
    createClaimableBalanceXdr,
    createPassiveSellOfferXdr,
    endSponsoringFutureReservesXdr,
    liquidityPoolDepositXdr,
    liquidityPoolWithdrawXdr,
    manageBuyOfferXdr,
    manageDataXdr,
    manageSellOfferXdr,
    operationsXdr,
    pathPaymentStrictReceiveXdr,
    pathPaymentStrictSendXdr,
    paymentXdr,
    revokeAccountSponsorshipXdr,
    revokeClaimableBalanceSponsorshipXdr,
    revokeDataSponsorshipXdr,
    revokeLiquidityPoolSponsorshipXdr,
    revokeOfferSponsorshipXdr,
    revokeSignerSponsorshipPreaAuthTx,
    revokeSignerSponsorshipSha256Xdr,
    revokeSignerSponsorshipXdr,
    revokeTrustLineSponsorshipXdr,
    setOptionsXdr,
    setTrustLineFlagsXdr,
} from '../../fixtures/operations.json';

describe('operations', () => {
    const BASE_URL = '/sign?xdr=';
    const SIMPLE_SIGNER_PRIVATE_KEY = Cypress.env('SIMPLE_SIGNER_PRIVATE_KEY');

    it('should connect with private key', () => {
        cy.visit('/connect');
        cy.get('.wallet-title').contains('Private Key').click();
        cy.get('#input-key').type(SIMPLE_SIGNER_PRIVATE_KEY);
        cy.get('.connect-btn').click();
    });

    it('should render two components if the xdr has two operations, ', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${operationsXdr}`);
        cy.get('.operations-container').children().should('have.length', 2);
        cy.get('.operation-info').should('exist');
        cy.get('.operation-info').should('exist');
    });

    it('should render a Payment component if the xdr has a Payment operation', () => {
        window.localStorage.setItem('wallet', 'albedo');
        cy.visit(`${BASE_URL}${paymentXdr}`);
        cy.get('.operation-info').contains('Amount');
        cy.get('.operation-info').contains('Destination');
        cy.get('.operation-info').contains('Asset');
    });

    it('should render a CreateAccount component if the xdr has a Create Account operation', () => {
        window.localStorage.setItem('wallet', 'freighter');
        cy.visit(`${BASE_URL}${createAccountXdr}`);
        cy.get('.operation-info').contains('Source Account');
        cy.get('.operation-info').contains('Starting Balance');
        cy.get('.operation-info').contains('Destination');
    });

    it('should render begin sponsoring future reserves operation', () => {
        window.localStorage.setItem('wallet', 'rabet');
        cy.visit(`${BASE_URL}${beginSponsoringFutureReservesXdr}`);
        cy.get('.operation-info').contains('Sponsored ID');
        cy.get('.operation-info').contains('GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T');
    });
    it('should render path payment strict send operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${pathPaymentStrictSendXdr}`);
        cy.get('.operation-info').contains('Asset you are using to pay: XLM');
        cy.get('.operation-info').contains('Amount: 2.0000000');
        cy.get('.operation-info').contains('Destination: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T');
        cy.get('.operation-info').contains('Minimum amount of destination asset to be received: 2.0000000');
        cy.get('.operation-info').contains('Source Account: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T');
    });

    it('should render path payment strict receive operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${pathPaymentStrictReceiveXdr}`);
        cy.get('.operation-info').contains('Asset you are using to pay: XLM');
        cy.get('.operation-info').contains('Max Amount: 3.0000000');
        cy.get('.operation-info').contains('Destination: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T');
        cy.get('.operation-info').contains('Path: XLM');
        cy.get('.operation-info').contains('Destination Asset: XLM');
        cy.get('.operation-info').contains('Amount: 2.0000000');
    });

    it('should render manage buy offer operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${manageBuyOfferXdr}`);
        cy.get('.operation-info').contains('Source Account: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T');
        cy.get('.operation-info').contains('Selling Asset: XLM');
        cy.get('.operation-info').contains('Buying Asset: XLM');
        cy.get('.operation-info').contains('Buy Amount: 2.0000000');
        cy.get('.operation-info').contains('Price: 1');
        cy.get('.operation-info').contains('Offer ID: 0');
    });

    it('should render manage sell offer operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${manageSellOfferXdr}`);
        cy.get('.operation-info').contains('Source Account: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T');
        cy.get('.operation-info').contains('Selling Asset: XLM');
        cy.get('.operation-info').contains('Buying Asset: XLM');
        cy.get('.operation-info').contains('Amount: 2.0000000');
        cy.get('.operation-info').contains('Price: 1');
        cy.get('.operation-info').contains('Offer ID: 0');
    });

    it('should render create passive sell offer operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${createPassiveSellOfferXdr}`);
        cy.get('.operation-info').contains('Source Account: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T');
        cy.get('.operation-info').contains('Selling: XLM');
        cy.get('.operation-info').contains('Buying: XLM');
        cy.get('.operation-info').contains('Amount: 2.0000000');
        cy.get('.operation-info').contains('Price: 1');
    });

    it('should render set options operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${setOptionsXdr}`);
        cy.get('.operation-info').contains('Source Account: GC3BZC6JUSOR76BHQJFO4CF7L4MCIB4GLBV7ECBXKK5BT3WLZ6ZP6EKQ');
        cy.get('.operation-info').contains('Set Flags: 11');
        cy.get('.operation-info').contains('Master Weight: 1');
        cy.get('.operation-info').contains('Low Threshold: 1');
        cy.get('.operation-info').contains('Medium Threshold: 2');
        cy.get('.operation-info').contains('High Threshold: 3');
        cy.get('.operation-info').contains(
            'Destination inflation: GC3BZC6JUSOR76BHQJFO4CF7L4MCIB4GLBV7ECBXKK5BT3WLZ6ZP6EKQ',
        );
        cy.get('.operation-info').contains('Clear Flags: 8');
        cy.get('.operation-info').contains('Home Domain: simplesigner.com');
        cy.get('.operation-info').contains('preAuthTx: TDSGQU6Q7M5DES2ZPCMQJI2FK6TLUJ4J2ALMR3XT63QBWPJFYCNW4XYF');
        cy.get('.operation-info').contains('Weight: 1');
        cy.get('.operation-info').should('not.contain', 'undefined');
    });

    it('should render change trust (normal asset) operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${changeTrustXdr}`);
        cy.get('.operation-info').contains('Asset: AUD');
        cy.get('.operation-info').contains('Source Account: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T');
        cy.get('.operation-info').contains('Limit: 922337203685.4775807');
    });

    it('should render change trust (liquidity pool asset) operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${changeTrustLiquidityPoolAssetXdr}`);
        cy.get('.operation-info').contains('Source Account: GDWTWTWO7WJF57UUXI42R4CJXT6MAKZ4K2THPJAW4EFKD5ATPNEQJ5W3');
        cy.get('.operation-info').contains('Asset A: XLM');
        cy.get('.operation-info').contains('Asset B: AUD');
        cy.get('.operation-info').contains('Limit: 922337203685.4775807');
    });

    it('should render account merge operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${accountMergeXdr}`);
        cy.get('.operation-info').contains('Source Account: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T');
        cy.get('.operation-info').contains('Destination: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T');
    });

    it('should render manage data operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${manageDataXdr}`);
        cy.get('.operation-info').contains('Source Account: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T');
        cy.get('.operation-info').contains('Name: asd');
        cy.get('.operation-info').contains('Data: qwe');
    });

    it('should render bump sequence operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${bumpSequenceXdr}`);
        cy.get('.operation-info').contains('Source Account: GCI5KGGNY4GKZOWEHTSFTJSBMRLQLJCCNV56TXKLMXZAOKZF3YZ2M7JI');
        cy.get('.operation-info').contains('Bump to: 51235678');
    });

    it('should render create claimable balance operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${createClaimableBalanceXdr}`);
        cy.get('.operation-info').contains('Source Account: GCI5KGGNY4GKZOWEHTSFTJSBMRLQLJCCNV56TXKLMXZAOKZF3YZ2M');
        cy.get('.operation-info').contains('Asset: XLM');
        cy.get('.operation-info').contains('Amount: 234656.0000000');
        cy.get('.operation-info').contains('Claimants:');
        cy.get('.operation-info').contains('GCI5KGGNY4GKZOWEHTSFTJSBMRLQLJCCNV56TXKLMXZAOKZF3YZ2M7JI');
    });

    it('should render end sponsoring future reserves operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${endSponsoringFutureReservesXdr}`);
        cy.get('.operation-title').contains('End Sponsoring Future Reserves');
        cy.get('.operation-info').contains('Source Account: GCI5KGGNY4GKZOWEHTSFTJSBMRLQLJCCNV56TXKLMXZAOKZF3YZ2M7JI');
    });

    it('should render revoke account sponsorship operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${revokeAccountSponsorshipXdr}`);
        cy.get('.operation-title').contains('Revoke Account Sponsorship');
        cy.get('.operation-info').contains('Source Account: GCI5KGGNY4GKZOWEHTSFTJSBMRLQLJCCNV56TXKLMXZAOKZF3YZ2M7JI');
        cy.get('.operation-info').contains('Account: GCI5KGGNY4GKZOWEHTSFTJSBMRLQLJCCNV56TXKLMXZAOKZF3YZ2M7JI');
    });

    it('should render revoke claimable balance sponsorship operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${revokeClaimableBalanceSponsorshipXdr}`);
        cy.get('.operation-info').contains('Source Account: GCI5KGGNY4GKZOWEHTSFTJSBMRLQLJCCNV56TXKLMXZAOKZF3YZ2M7JI');
        cy.get('.operation-info').contains(
            'Balance ID: 00000000da0d57da7d4850e7fc10d2a9d0ebc731f7afb40574c03395b17d49149b91f5be',
        );
    });

    it('should render revoke data sponsorship operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${revokeDataSponsorshipXdr}`);
        cy.get('.operation-info').contains('Source Account: GBGQAJHRMZ4X47KKNBEORZHK4QWBGNU2BUDKYLLWXTDZS46ZUHVO77UF');
        cy.get('.operation-info').contains('Account: GBGQAJHRMZ4X47KKNBEORZHK4QWBGNU2BUDKYLLWXTDZS46ZUHVO77UF');
        cy.get('.operation-info').contains('Name: asd');
    });
    it('should render revoke liquidity pool sponsorship operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${revokeLiquidityPoolSponsorshipXdr}`);
        cy.get('.operation-info').contains('Source Account: GACXTDPQUGJFX7NS4TREHBL2VOGPUFCF4ZWQYKTWOHR4XGMBATZ6SRO5');
        cy.get('.operation-info').contains(
            'Liquidity Pool ID: dd7b1ab831c273310ddbec6f97870aa83c2fbd78ce22aded37ecbf4f3380fac7',
        );
    });

    it('should render revoke offer sponsorship operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${revokeOfferSponsorshipXdr}`);
        cy.get('.operation-info').contains('Source Account: GCFND4NPUKO27EBXB4IWM7AEMVH7P6HGRFGDPZVBNS7ZSDQ3EOK3MRTB');
        cy.get('.operation-info').contains('Seller: GCFND4NPUKO27EBXB4IWM7AEMVH7P6HGRFGDPZVBNS7ZSDQ3EOK3MRTB');
        cy.get('.operation-info').contains('Offer ID: 1234');
    });

    it('should render revoke signer sponsorship operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${revokeSignerSponsorshipXdr}`);
        cy.get('.operation-info').contains('Source Account: GCFND4NPUKO27EBXB4IWM7AEMVH7P6HGRFGDPZVBNS7ZSDQ3EOK3MRTB');
        cy.get('.operation-info').contains('Account: GCFND4NPUKO27EBXB4IWM7AEMVH7P6HGRFGDPZVBNS7ZSDQ3EOK3MRTB');
        cy.get('.operation-info').contains('Signer: GCFND4NPUKO27EBXB4IWM7AEMVH7P6HGRFGDPZVBNS7ZSDQ3EOK3MRTB');
    });
    it('should render revoke signer sponsorship operation with sha256 signer', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${revokeSignerSponsorshipSha256Xdr}`);
        cy.get('.operation-info').contains('Source Account: GA2FBCLFZZHJ2EPGCBV3SEVSFN3GPGTKAQL6R5C2PQA2IE2N3JLKHB7X');
        cy.get('.operation-info').contains('Account: GA2FBCLFZZHJ2EPGCBV3SEVSFN3GPGTKAQL6R5C2PQA2IE2N3JLKHB7X');
        cy.get('.operation-info').contains('Signer: a46d20e09c00a1eb32132dbf22ba2a33c511a413431e2210a53d42ab1d6d8fd4');
    });

    it('should render revoke signer sponsorship operation with preAuth signer', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${revokeSignerSponsorshipPreaAuthTx}`);
        cy.get('.operation-info').contains('Source Account: GAAKB6IS2LZDFVMIWXMHNRWQPCB7DH5GSE5OQPI6LRLTGH4FXQZ2NG4Y');
        cy.get('.operation-info').contains('Account: GAAKB6IS2LZDFVMIWXMHNRWQPCB7DH5GSE5OQPI6LRLTGH4FXQZ2NG4Y');
        cy.get('.operation-info').contains('Signer: 1df3f71325f8ed058a6307e5c59cff3d944a27bebbb55a0e7cfa5d40d1c93cd3');
    });

    it('should render allow trust operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${allowTrustXdr}`);
        cy.get('.operation-info').contains('Source Account: GBKBWABVN5HGKCGIFJSWGOELGPPMYAWO27RFEVFGJG26NAEVHRSRLKN3');
        cy.get('.operation-info').contains('Asset: AUD');
        cy.get('.operation-info').contains('Authorization: The account is authorized to transact with the asset');
    });

    it('should render claim claimable balance operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${claimClaimableBalanceXdr}`);
        cy.get('.operation-info').contains('Source Account: GBKBWABVN5HGKCGIFJSWGOELGPPMYAWO27RFEVFGJG26NAEVHRSRLKN3');
        cy.get('.operation-info').contains(
            'Balance ID: 00000000da0d57da7d4850e7fc10d2a9d0ebc731f7afb40574c03395b17d49149b91f5be',
        );
    });

    it('should render set trust line flags operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${setTrustLineFlagsXdr}`);
        cy.get('.operation-info').contains('Source Account: GBKBWABVN5HGKCGIFJSWGOELGPPMYAWO27RFEVFGJG26NAEVHRSRLKN3');
        cy.get('.operation-info').contains('Trustor: GBKBWABVN5HGKCGIFJSWGOELGPPMYAWO27RFEVFGJG26NAEVHRSRLKN3');
        cy.get('.operation-info').contains('Asset: AUD');
        cy.get('.operation-info').contains('Is authorized: True');
        cy.get('.operation-info').contains('Is authorized to maintain liabilities: True');
        cy.get('.operation-info').contains('Is clawback enabled: False');
    });

    it('should render liquidity pool deposit operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${liquidityPoolDepositXdr}`);
        cy.get('.operation-info').contains('Source Account: GBKBWABVN5HGKCGIFJSWGOELGPPMYAWO27RFEVFGJG26NAEVHRSRLKN3');
        cy.get('.operation-info').contains(
            'Liquidity Pool ID: 67260c4c1807b262ff851b0a3fe141194936bb0215b2f77447f1df11998eabb9',
        );
        cy.get('.operation-info').contains('Max Amount A: 20.0000000');
        cy.get('.operation-info').contains('Max Amount B: 20.0000000');
        cy.get('.operation-info').contains('Minimum Price: 1');
        cy.get('.operation-info').contains('Maximum Price: 1');
    });

    it('should render clawback claimable balance operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${clawbackClaimableBalanceXdr}`);
        cy.get('.operation-info').contains('Source Account: GCKIJAGP35IRNIF4U3C7Z5LQ5FJXKHQMVN7APY4OZIIGK5RKX274RJJU');
        cy.get('.operation-info').contains(
            'Balance ID: 00000000da0d57da7d4850e7fc10d2a9d0ebc731f7afb40574c03395b17d49149b91f5be',
        );
    });

    it('should render clawback operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${clawbackXdr}`);
        cy.get('.operation-info').contains('Source Account: GBKBWABVN5HGKCGIFJSWGOELGPPMYAWO27RFEVFGJG26NAEVHRSRLKN3');
        cy.get('.operation-info').contains('Asset: AUD');
        cy.get('.operation-info').contains('Amount: 2.0000000');
        cy.get('.operation-info').contains('From: GBKBWABVN5HGKCGIFJSWGOELGPPMYAWO27RFEVFGJG26NAEVHRSRLKN3');
    });

    it('should render liquidity pool withdraw operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${liquidityPoolWithdrawXdr}`);
        cy.get('.operation-info').contains('Source Account: GBKBWABVN5HGKCGIFJSWGOELGPPMYAWO27RFEVFGJG26NAEVHRSRLKN3');
        cy.get('.operation-info').contains(
            'Liquidity Pool ID: 67260c4c1807b262ff851b0a3fe141194936bb0215b2f77447f1df11998eabb9',
        );
        cy.get('.operation-info').contains('Amount: 20.0000000');
        cy.get('.operation-info').contains('Min Amount A: 2.0000000');
        cy.get('.operation-info').contains('Min Amount B: 2.0000000');
    });

    it('should render revoke trustline sponsorship operation', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${revokeTrustLineSponsorshipXdr}`);
        cy.get('.operation-info').contains('Source Account: GBKBWABVN5HGKCGIFJSWGOELGPPMYAWO27RFEVFGJG26NAEVHRSRLKN3');
        cy.get('.operation-info').contains('Account: GBKBWABVN5HGKCGIFJSWGOELGPPMYAWO27RFEVFGJG26NAEVHRSRLKN3');
        cy.get('.operation-info').contains('Asset: XLM');
    });
});
