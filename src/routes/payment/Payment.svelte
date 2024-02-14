<script lang="ts">
    import { Link } from 'svelte-navigator';

    import Bridge, { SimpleSignerPageType } from '../../lib/bridge/Bridge';
    import { setMinimumPopUpSize } from '../../lib/components/helpers/popUpSizeHelper';
    import type { WalletConnectService } from '../../lib/service/walletConnect';
    import { createPaymentTransaction } from '../../lib/stellar/Payment';
    import { CURRENT_STELLAR_NETWORK } from '../../lib/stellar/StellarNetwork';
    import { server } from '../../lib/stellar/utils';
    import LocalStorage from '../../lib/storage/storage';
    import type IWallet from '../../lib/wallets/IWallet';
    import WalletFactory from '../../lib/wallets/WalletFactory';
    import WalletConnect from '../../lib/wallets/walletConnect/WalletConnect';
    import { language } from '../../store/global';

    export let walletConnectService: WalletConnectService;

    const storage = new LocalStorage();

    let wallet: IWallet;
    const storedWallet = storage.getItem('wallet');
    const walletFactory = new WalletFactory();

    if (storedWallet) {
        if (storedWallet === WalletConnect.NAME) {
            wallet = walletFactory.createWalletConnect(walletConnectService);
        } else {
            wallet = walletFactory.create(storedWallet);
        }
    }

    let receiver = '';
    let amount = '';
    let assetCode = '';
    let issuer = '';

    const bridge = new Bridge(SimpleSignerPageType.PAYMENT);
    const urlParams = bridge.getPaymentMessageFromUrl();

    if (urlParams) {
        ({ receiver, amount, assetCode, issuer } = urlParams);
    } else {
        bridge.addPaymentMessageHandler((message) => {
            ({ receiver, amount, assetCode, issuer } = message);
        });
    }

    let isPaymentInProgress = false;
    let paymentResultMessage = '';

    async function handlePayment() {
        if (isPaymentInProgress) return;

        isPaymentInProgress = true;
        const publicKey = await wallet.getPublicKey();

        try {
            const result = await createPaymentTransaction(publicKey, receiver, amount, assetCode, issuer);
            await wallet.sign(result);
            await server.submitTransaction(result);
            paymentResultMessage = $language.SUCCESSFUL_PAYMENT;
        } catch (error) {
            console.error(error);
            paymentResultMessage = $language.FAILED_PAYMENT;
        } finally {
            isPaymentInProgress = false;
        }
    }

    const handlePopupClose = () => {
        paymentResultMessage = '';
        handleCancel();
    };

    const redirect = encodeURIComponent(
        `payment?receiver=${receiver}&amount=${amount}&assetCode=${assetCode}&issuer=${issuer}`,
    );

    function handleCancel() {
        bridge.sendOnCancelEvent();
    }

    bridge.sendOnReadyEvent();

    const minimumPaymentPopupHeight = 600;
    const minimumPaymentPopupWidth = 340;
    const defaultPaymentPopupWidth = 360;
    const defaultPaymentPopupHeight = 650;

    setMinimumPopUpSize(
        minimumPaymentPopupHeight,
        minimumPaymentPopupWidth,
        defaultPaymentPopupHeight,
        defaultPaymentPopupWidth,
    );
</script>

{#if paymentResultMessage}
    <div class="simple-signer payment-result-message">
        <div class="simple-signer payment-result-text">{paymentResultMessage}</div>
        <button class="simple-signer accept-button" on:click={handlePopupClose}>{$language.CLOSE}</button>
    </div>
{:else}
    <div class="simple-signer tx-data-container">
        {#if !receiver || !amount || !assetCode || !issuer}
            <h1 class="simple-signer error-title">{$language.ERROR}</h1>
            <div class="simple-signer information-container">
                <p class="simple-signer">{$language.ERROR_MISSING_RECEIVER_DATA}</p>
                <button class="simple-signer accept-button" on:click={handlePopupClose}>{$language.CLOSE}</button>
            </div>
        {:else}
            <h1 class="simple-signer pay-title">{$language.PAY}</h1>
            <div class="simple-signer tx-network-container">
                <div class="simple-signer pay-network-container">
                    <p>{$language.NETWORK}:</p>
                    <p class="simple-signer pay-network-text">{CURRENT_STELLAR_NETWORK}</p>
                </div>
            </div>
            <div class="simple-signer receiver">
                {$language.YOU_ARE_PAYING}
                <strong>{amount}</strong>
                <strong>{assetCode === 'native' ? 'XLM' : { assetCode }}</strong>
                {$language.TO_THE_ACCOUNT}
                <br />
                <strong>{receiver}.</strong>
            </div>

            {#if wallet}
                <div class="simple-signer confirmation-buttons">
                    <button
                        class="simple-signer cancel-button"
                        on:click={() => handlePopupClose()}
                        disabled={isPaymentInProgress}
                    >
                        {$language.CANCEL}</button
                    >
                    <button on:click={handlePayment} disabled={isPaymentInProgress} class="simple-signer payment-btn">
                        {#if isPaymentInProgress}
                            <span class="simple-signer spinner" />
                        {:else}
                            {$language.PAY}
                        {/if}
                    </button>
                </div>
            {:else}
                <div class="simple-signer information-container">
                    <p class="simple-signer user-not-connected">{$language.USER_IS_NOT_CONNECTED}</p>
                    <button class="simple-signer payment-btn">
                        <Link to={`/connect/?redirect=${redirect}`}>{$language.GO_TO_CONNECT}</Link>
                    </button>
                </div>
            {/if}
        {/if}
    </div>
{/if}

<style>
    .tx-data-container {
        text-align: left;
        letter-spacing: 0.14px;
        color: #757575;
        opacity: 1;
        margin-top: 20px;
        margin-bottom: 27px;
        font-size: 14px;
        padding: 20px;
        display: grid;
        font-family: 'Roboto', sans-serif;
    }

    .tx-network-container {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }

    .receiver {
        word-break: break-all;
        line-height: 1.5;
    }

    .information-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }

    .error-title {
        font-size: 16px;
        text-transform: uppercase;
    }

    .pay-title {
        font-size: 16px;
        text-transform: uppercase;
        margin: 0;
        color: black;
    }

    .pay-network-container {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }

    .pay-network-text {
        color: #2f69b7;
    }

    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top: 4px solid #f5f5f5;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
        display: inline-block;
        margin-right: 5px;
    }

    .payment-result-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 80px;
        padding: 20px;
        font-family: 'Roboto', sans-serif;
    }

    .payment-result-text {
        font-size: 16px;
        margin-bottom: 10px;
    }

    .accept-button {
        color: #f5f5f5;
        background: #2f69b7 0% 0% no-repeat padding-box;
        width: 140px;
        height: 39px;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0px 4px 2px #00000029;
        opacity: 1;
        border: none;
    }

    .accept-button:hover {
        background-color: #1f4f8b;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .confirmation-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 10px;
    }

    .confirmation-buttons button {
        width: 140px;
        height: 39px;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0px 4px 2px #00000029;
        opacity: 1;
        border: none;
        margin-bottom: 30px;
    }

    .cancel-button {
        background: #f5f5f5 0% 0% no-repeat padding-box;
    }

    .cancel-button:hover {
        opacity: 50%;
        cursor: pointer;
    }

    .payment-btn {
        color: #f5f5f5;
        background: #2f69b7 0% 0% no-repeat padding-box;
        width: 140px;
        height: 39px;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0px 4px 2px #00000029;
        opacity: 1;
        border: none;
    }

    button:hover {
        opacity: 50%;
        cursor: pointer;
    }
</style>
