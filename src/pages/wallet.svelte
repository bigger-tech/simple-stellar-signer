<script>
    const userFromLocalStorage = window.localStorage.getItem('user');
    const parseUserFromLocalStorage = () => {
        if (userFromLocalStorage != undefined) {
            return JSON.parse(userFromLocalStorage);
        } else {
            return null;
        }
    };
    const user = parseUserFromLocalStorage();

    import { handleForm, onClickHandler } from '../utils/utils';

    const destination = 'GAVPIQ5RZCTNXWB5257PEQEZUBUKE37RQ4ZGDCNZPTKK3KLXGVIP2DBJ';

    const goToHome = () => {
        window.localStorage.clear();
        window.location.href = '/';
    };
</script>

<button on:click="{goToHome}">Select a different wallet</button>
<button id="init-payment-button" on:click="{onClickHandler}">Send a payment</button>
<form id="form" on:submit="{handleForm}" class="hide">
    <input id="destination" type="text" name="destination" placeholder="Destination" value="{destination}" required />
    <input id="amount" type="number" name="amount" placeholder="Amount" required />
    <input type="submit" value="Send" />
</form>
<div>Wallet: {user.wallet}</div>
<div>You have {user.balance} XLM</div>
<div>Your public key is {user.key}</div>

<style>
    .hide {
        display: none;
    }
</style>
