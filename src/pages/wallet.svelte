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
</script>

<div>Wallet: {user.wallet}</div>
<div>You have {user.balance} XLM</div>
<div>Your public key is {user.key}</div>
