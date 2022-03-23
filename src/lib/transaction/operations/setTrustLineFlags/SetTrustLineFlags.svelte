<script lang="ts">
    import WalletLanguage from '../../../../helpers/WalletLanguage';
    export let optionalSource: string;
    export let defaultSource: string;
    export let trustor: string;
    export let asset: string;
    export let authorized: boolean;
    export let authorizedToMaintainLiabilities: boolean;
    export let clawbackEnabled: boolean | undefined;

    const language = new WalletLanguage();
    const lang = language.getText();
</script>

<div class="simple-signer set-trust-line-flags-operation">
    <h3>{lang.OPERATION} {lang.OPERATION_SET_TRUSTLINE_FLAGS}</h3>
    <p>{lang.SOURCE_ACCOUNT} {optionalSource ? optionalSource : defaultSource}</p>
    <p>{lang.TRUSTOR} {trustor}</p>
    <p>{lang.ASSET} {asset}</p>
    <p>{lang.IS_AUTHORIZED} {authorized ? 'True' : 'False'}</p>
    <p>{lang.IS_AUTHORIZED_TO_MAINTAIN_LIABILITIES} {authorizedToMaintainLiabilities ? 'True' : 'False'}</p>
    <p>{lang.IS_CLAWBACK_ENABLED} {clawbackEnabled ? 'True' : 'False'}</p>
</div>
