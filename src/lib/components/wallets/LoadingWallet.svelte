<div class="loading-wallet" />

<style>
    .loading-wallet {
        display: flex;
        border: 1px solid #f5f5f5;
        width: 310px;
        height: 58px;
        margin-bottom: 15px;
        cursor: pointer;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        animation: 1.5s shine linear infinite;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
        background-size: 200% 100%;
    }

    @keyframes shine {
        to {
            background-position-x: -200%;
        }
    }
</style>
