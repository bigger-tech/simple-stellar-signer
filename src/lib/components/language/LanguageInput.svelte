<script lang="ts">
    import { detectedLanguage } from '../../../store/global';
    import type ILanguageInputProps from './ILanguageInputProps';
    import { changeLanguage } from './languageHelper';

    let activeLanguage = $detectedLanguage;
    export let languageInputProps: ILanguageInputProps[];
</script>

{#each languageInputProps as language}
    <label
        class="simple-signer language {activeLanguage === language.iso ? 'active' : 'default'}"
        on:change={() => changeLanguage(activeLanguage)}
    >
        <input
            class="simple-signer hide-circle"
            bind:group={activeLanguage}
            value={language.iso}
            type="radio"
            name="language"
        />
        {language.text}
    </label>
{/each}

<style>
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

    .active {
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
</style>
