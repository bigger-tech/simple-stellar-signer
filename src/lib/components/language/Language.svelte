<script>
    import { isLanguageMenuVisible } from './languageStore';
    import languageIcon from '../../../assets/icons/language.svg';

    function toggleLanguageMenu() {
        $isLanguageMenuVisible = !$isLanguageMenuVisible;
    }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-invalid-attribute -->
<div class="simple-signer language-container">
    <div
        on:mouseover={toggleLanguageMenu}
        on:mouseout={toggleLanguageMenu}
        class="simple-signer language-container-icon"
    >
        <img class="simple-signer language-icon" src={languageIcon} alt="*" />

        <div class="simple-signer language-selector-container {$isLanguageMenuVisible ? '' : 'hidden'}">
            <a class="active" href="#">English</a>
            <a class="default" href="#">Spanish</a>
        </div>
    </div>
</div>

<style>
    :global(a) {
        text-decoration: none;
    }

    .language-container-icon {
        margin-top: 7px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
    }

    .language-selector-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        background: #ffffff 0% 0% no-repeat padding-box;
        border-radius: 6px;
        min-width: 90px;
        box-shadow: 3px 3px 8px #00000029;
        z-index: 1;
        margin-top: 20px;
    }

    .language-selector-container a {
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
            'Helvetica Neue', sans-serif;

        margin-bottom: 12px;
    }

    .language-selector-container a:first-child {
        margin-top: 12px;
    }

    .active {
        font-weight: bold;
        color: #2f69b7;
    }

    .default {
        color: #757575;
        font-weight: 500;
    }

    .hidden {
        display: none;
    }

    .language-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-right: 11px;
    }

    .language-icon {
        height: 21px;
    }

    .language-container img {
        filter: invert(51%) sepia(0%) saturate(1810%) hue-rotate(221deg) brightness(89%) contrast(89%);
    }
</style>
