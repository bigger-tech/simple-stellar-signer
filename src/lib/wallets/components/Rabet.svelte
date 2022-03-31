<script>
    import Rabet from '../../../routes/connect/ui/wallets/Rabet';
    import Wallet from '../WalletTemplate.svelte';
    import { rabet } from '../../../assets/index';

    const wallet = new Rabet();
    async function connect() {
        wallet.logIn(await wallet.getPublicKey());
    }
</script>

<Wallet title="Rabet" img={rabet} connectMethod={connect} />
