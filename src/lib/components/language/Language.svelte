<script>
    import { isLanguageMenuVisible } from './languageStore';
    import languageIcon from '../../../assets/icons/language.svg';
    import { language } from '../../../store/global';
    import { showMenu, hideMenu } from './languageHelper';
</script>

<div class="simple-signer language-container">
    <div
        tabindex="-1"
        on:focus={showMenu}
        on:blur={hideMenu}
        class="simple-signer language-container-icon  {$isLanguageMenuVisible ? 'active' : ''}"
    >
        <img class="simple-signer language-icon" src={languageIcon} alt="*" />

        <div class="simple-signer language-selector-container {$isLanguageMenuVisible ? '' : 'hidden'}">
            <button class="language-active">{$language.ENGLISH}</button>
            <button class="default">{$language.SPANISH}</button>
        </div>
    </div>
</div>

<style>
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

    .language-selector-container button {
        font-family: 'Roboto', sans-serif;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 14px;
        margin-bottom: 12px;
    }

    .language-selector-container button:first-child {
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
