<script lang="ts">
    import { initXBull } from './wallets/xBull';
</script>

<main>
    <button>Connect with Albedo</button>
    <button>Connect with Freighter</button>
    <button on:click="{initXBull}">Connect with xBull</button>
</main>
