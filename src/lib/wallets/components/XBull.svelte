<script>
    import XBull from '../../../routes/connect/ui/wallets/XBull';
    import Wallet from '../WalletTemplate.svelte';
    import { xBull } from '../../../assets/index';

    const wallet = new XBull();
    async function connect() {
        wallet.logIn(await wallet.getPublicKey());
    }
</script>

<Wallet title="xBull" img={xBull} connectMethod={connect} />
