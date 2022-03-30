<script>
    import XBull from '../../../routes/connect/ui/wallets/XBull';
    import Wallet from '../WalletTemplate.svelte';
    import { xBull } from '../../../assets/index';

    const xbull = new XBull();
    async function connect() {
        xbull.logIn(await xbull.getPublicKey());
    }
</script>

<Wallet title="xBull" img={xBull} connectMethod={connect} />
