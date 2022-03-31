<script>
    import Albedo from '../../../routes/connect/ui/wallets/Albedo';
    import Wallet from '../WalletTemplate.svelte';
    import { albedo } from '../../../assets/index';

    const wallet = new Albedo();
    async function connect() {
        wallet.logIn(await wallet.getPublicKey());
    }
</script>

<Wallet title="Albedo" img={albedo} connectMethod={connect} />
