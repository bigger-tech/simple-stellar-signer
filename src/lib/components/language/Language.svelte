<script>
    import { isLanguageMenuVisible } from './languageStore';
    import languageIcon from '../../../assets/icons/language.svg';
    import ClickOutside from '../customEvent/ClickOutside.svelte';
    import { hideMenu } from './languageHelper';
    import LanguageInputs from './LanguageInputs.svelte';
    import { language } from '../../../store/global';

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
                <LanguageInputs
                    languageInputsProps={[
                        { iso: 'es', text: $language.SPANISH },
                        { iso: 'en', text: $language.ENGLISH },
                    ]}
                />
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
