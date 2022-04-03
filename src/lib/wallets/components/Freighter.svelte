<script>
    import Freighter from '../../../routes/connect/ui/wallets/Freighter';
    import Wallet from '../WalletTemplate.svelte';
    import { freighter } from '../../../assets/index';

    const wallet = new Freighter();
    async function connect() {
        wallet.logIn(await wallet.getPublicKey());
    }
</script>

<Wallet title="Freighter" img={freighter} connectMethod={connect} />
