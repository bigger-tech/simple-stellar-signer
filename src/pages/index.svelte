<script>
    import { initAlbedo } from '../wallets/albedo';
    import { initXBull } from '../wallets/xBull';
    import { initFreighter } from '../wallets/freighter';
</script>

<button on:click="{initAlbedo}">Connect with Albedo</button>
<button on:click="{initFreighter}">Connect with Freighter</button>
<button on:click="{initXBull}">Connect with xBull</button>
