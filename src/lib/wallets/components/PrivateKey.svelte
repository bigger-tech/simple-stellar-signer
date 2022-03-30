<script>
    import Wallet from '../WalletTemplate.svelte';
    import { privateKey } from '../../../assets/index';
    import { isWalletHidden } from '../../../routes/connect/connectStore';

    async function showPrivateKeyInput() {
        $isWalletHidden = !$isWalletHidden;
    }
</script>

<Wallet title="Private Key" img={privateKey} width={45} connectMethod={showPrivateKeyInput} />
