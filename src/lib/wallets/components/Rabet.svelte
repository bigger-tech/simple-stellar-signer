<script>
    import Rabet from '../../../routes/connect/ui/wallets/Rabet';
    import Wallet from '../WalletTemplate.svelte';
    import { rabet } from '../../../assets/index';

    const rabetClass = new Rabet();
    async function connect() {
        rabetClass.logIn(await rabetClass.getPublicKey());
    }
</script>

<Wallet title="Rabet" img={rabet} connectMethod={connect} />
