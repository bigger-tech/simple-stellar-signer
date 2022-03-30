<script>
    import Freighter from '../../../routes/connect/ui/wallets/Freighter';
    import Wallet from '../WalletTemplate.svelte';
    import { freighter } from '../../../assets/index';

    const freighterClass = new Freighter();
    async function connect() {
        freighterClass.logIn(await freighterClass.getPublicKey());
    }
</script>

<Wallet title="Freighter" img={freighter} connectMethod={connect} />
