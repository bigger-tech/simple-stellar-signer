<script lang="ts">
    import { detectedLanguage, language } from '../../../store/global';
    import { changeLanguage } from './languageHelper';

    let activeLanguage = $detectedLanguage;
</script>

<label class={activeLanguage === 'en' ? 'language-active' : 'default'} on:change={() => changeLanguage(activeLanguage)}>
    <input bind:group={activeLanguage} value={'en'} type="radio" name="language" />
    {$language.ENGLISH}
</label>
<label class={activeLanguage === 'es' ? 'language-active' : 'default'} on:change={() => changeLanguage(activeLanguage)}>
    <input bind:group={activeLanguage} value={'es'} type="radio" name="language" />
    {$language.SPANISH}
</label>

<style>
    input {
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
</style>
