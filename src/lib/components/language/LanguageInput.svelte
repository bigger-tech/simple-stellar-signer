<script lang="ts">
    import { detectedLanguage, language } from '../../../store/global';
    import { changeLanguage } from './languageHelper';

    let activeLanguage = $detectedLanguage;
</script>

<label
    class="simple-signer language {activeLanguage === 'en' ? ' active' : 'default'}"
    on:change={() => changeLanguage(activeLanguage)}
>
    <input class="simple-signer hide-circle" bind:group={activeLanguage} value={'en'} type="radio" name="language" />
    {$language.ENGLISH}
</label>
<label
    class="simple-signer language {activeLanguage === 'es' ? 'active' : 'default'}"
    on:change={() => changeLanguage(activeLanguage)}
>
    <input class="simple-signer hide-circle" bind:group={activeLanguage} value={'es'} type="radio" name="language" />
    {$language.SPANISH}
</label>

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
