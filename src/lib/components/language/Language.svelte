<script>
    import { isLanguageMenuVisible } from './languageStore';
    import languageIcon from '../../../assets/icons/language.svg';
    import { detectedLanguage, language } from '../../../store/global';
    import ClickOutside from '../customEvent/ClickOutside.svelte';
    import { hideMenu } from './languageHelper';
    import WalletLanguage from '../../../lib/i18n/WalletLanguage';
    let activeLanguage = $detectedLanguage;
    const walletLanguage = new WalletLanguage();

    async function changeLanguage() {
        const newLanguage = await walletLanguage.getText(activeLanguage);
        language.set(newLanguage);
    }

    function toggleMenuVisibility() {
        $isLanguageMenuVisible = !$isLanguageMenuVisible;
    }
</script>

<div class="simple-signer language-container">
    <ClickOutside on:clickoutside={hideMenu}>
        <div class="simple-signer language-container-icon  {$isLanguageMenuVisible ? 'active' : ''}">
            <button on:click={toggleMenuVisibility} class="simple-signer invisible-button">
                <img class="simple-signer language-icon" src={languageIcon} alt="*" />
            </button>
            <div class="simple-signer language-selector-container {$isLanguageMenuVisible ? '' : 'hidden'}">
                <label class={activeLanguage === 'en' ? 'language-active' : 'default'} on:change={changeLanguage}>
                    <input bind:group={activeLanguage} value={'en'} type="radio" name="language" />
                    {$language.ENGLISH}
                </label>
                <label class={activeLanguage === 'es' ? 'language-active' : 'default'} on:change={changeLanguage}>
                    <input bind:group={activeLanguage} value={'es'} type="radio" name="language" />
                    {$language.SPANISH}
                </label>
            </div>
        </div>
    </ClickOutside>
</div>

<style>
    .invisible-button {
        padding: 0;
        border: none;
        background: none;
        margin: 0;
    }

    .language-container-icon {
        margin-top: 7px;
        margin-right: 10px;
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

    .language-selector-container input {
        margin: 0;
        padding: 0;
        border: none;
        appearance: none;
    }

    .language-selector-container label {
        font-family: 'Roboto', sans-serif;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 14px;
        margin-bottom: 12px;
    }

    .language-selector-container label:first-child {
        margin-top: 12px;
    }

    .language-active {
        font-weight: bold;
        color: #2f69b7;
    }

    .default {
        color: #757575;
        font-weight: 500;
    }

    .default:hover {
        font-weight: bold;
    }

    .default:focus {
        font-weight: bold;
    }

    .hidden {
        display: none;
    }

    .language-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        max-width: 360px;
        width: 100%;
    }

    .language-icon {
        cursor: pointer;
        height: 21px;
    }

    .language-container img {
        filter: invert(51%) sepia(0%) saturate(1810%) hue-rotate(221deg) brightness(89%) contrast(89%);
    }

    .active img {
        filter: brightness(0%);
    }

    .language-container-icon img:hover {
        filter: brightness(0%);
    }
</style>
