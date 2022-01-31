<script>
    export let source = '';
    export let startingBalance = '';
    export let destination = '';
</script>

<div class="simple-signer create-account-operation">
    <h3>Create Account</h3>
    <p>Source Account: {source ? source : 'no source account'}</p>
    <p>Starting Balance: {startingBalance}</p>
    <p>Destination: {destination}</p>
</div>
