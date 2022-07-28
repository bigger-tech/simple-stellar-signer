<script lang="ts">
    import { Link } from 'svelte-navigator';

    import logoutIcon from '../../../assets/icons/logout.svg';
    import { isLogoutVisible, language } from '../../../store/global';
    import type IStorage from '../../storage/IStorage';
    import { isLanguageMenuVisible } from '../language/languageStore';

    export let storage: IStorage;

    function toggleMenuVisibility() {
        $isLogoutVisible = !$isLogoutVisible;
        $isLanguageMenuVisible = false;
    }
</script>

<div class="simple-signer logout-container">
    <div class="simple-signer logout-container-icon  {$isLogoutVisible && 'active'}">
        <button on:click={toggleMenuVisibility} class="simple-signer logout-button">
            <img class="simple-signer logout-icon" src={logoutIcon} alt="logout icon" />
        </button>
        <div class="simple-signer logout-selector-container {$isLogoutVisible ? '' : 'hidden'}">
            <Link to="/connect">
                <label class="simple-signer logout-active" on:click={() => storage.clearStorage()}>
                    <input class="simple-signer hide-circle" type="radio" name="logout" />
                    {$language.LOGOUT}
                </label>
            </Link>
        </div>
    </div>
</div>

<style>
    .logout-button {
        padding: 0;
        border: none;
        background: none;
        margin: 0;
    }

    .logout-container-icon {
        margin-top: 7px;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
    }

    .logout-selector-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        background: #ffffff 0% 0% no-repeat padding-box;
        border-radius: 6px;
        min-width: 105px;
        min-height: 30px;
        box-shadow: 3px 3px 8px #00000029;
        z-index: 1;
        margin-top: 20px;
    }

    .hidden {
        display: none;
    }

    .logout-container {
        max-width: 360px;
        width: 100%;
    }

    .logout-icon {
        cursor: pointer;
        height: 21px;
    }

    .logout-container img {
        filter: invert(51%) sepia(0%) saturate(1810%) hue-rotate(221deg) brightness(89%) contrast(89%);
    }

    .active img {
        filter: brightness(0%);
    }

    .logout-container-icon img:hover {
        filter: brightness(0%);
    }

    .hide-circle {
        margin: 0;
        padding: 0;
        border: none;
        appearance: none;
    }

    label {
        font-family: 'Roboto', sans-serif;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 14px;
        margin-bottom: 12px;
    }

    label:first-child {
        margin-top: 12px;
    }

    .logout-active {
        font-weight: bold;
        color: #2f69b7;
    }
</style>
