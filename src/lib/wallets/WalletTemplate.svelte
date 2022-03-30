<script lang="ts">
    export let img: string;
    export let title: string;
    export let width = 35;
    export let height = 45;
    export let connectMethod: any;
</script>

<div class="simple-signer wallet-container">
    <a href={'#'} class="connect-wallet" on:click={() => connectMethod()}>
        <img class="simple-signer wallet-logo" src={img} alt="{title} logo" width={width} height={height} />
        <p class="simple-signer wallet-title">{title}</p>
    </a>
</div>

<style>
    .wallet-logo {
        margin-top: 25px;
    }

    .wallet-title {
        margin-top: 7px;
    }

    .wallet-title:hover {
        color: #000;
    }

    a {
        text-decoration: inherit;
        color: inherit;
    }

    .wallet-container {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        color: #bdbdbd;
        outline: 0.1px solid #e5e5e5;
        width: 130px;
        height: 120px;
        margin-top: 18px;
    }
    @media screen and (max-width: 291px) {
        .wallet-container {
            margin-top: 15px;
        }
    }
</style>
