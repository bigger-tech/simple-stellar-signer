<script>
    import Albedo from '../../../routes/connect/ui/wallets/Albedo';
    import Wallet from '../WalletTemplate.svelte';
    import { albedo } from '../../../assets/index';

    const albedoClass = new Albedo();
    async function connect() {
        albedoClass.logIn(await albedoClass.getPublicKey());
    }
</script>

<Wallet title="Albedo" img={albedo} connectMethod={connect} />
