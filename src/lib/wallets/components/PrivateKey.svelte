<script>
    import Wallet from '../WalletTemplate.svelte';
    import { privateKey } from '../../../assets/index';
    import { isWalletHidden } from '../../../routes/connect/connectStore';
    import { language } from '../../../store/store';

    async function showPrivateKeyInput() {
        $isWalletHidden = !$isWalletHidden;
    }
</script>

<Wallet title={$language.PRIVATE_KEY} img={privateKey} width={45} connectMethod={showPrivateKeyInput} />
