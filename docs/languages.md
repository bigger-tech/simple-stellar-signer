## How to add a language to Simple Signer?

To add a new language to Simple Signer there are a few steps you have to take:

-   Create a JSON file in `src/lib/i18n/languages` folder with the name of your language e.g., `spanish.json`.
-   Copy and paste the `english.json` data to `spanish.json` and replace the values with your language.
-   Open `src/lib/i18n/LanguageName.ts` file and add your constant language name.
-   Open `src/lib/i18n/WalletLanguageFactory.ts` file and import your module inside the switch case like `spanish.json`.

## Screenshots

![App Screenshot](https://i.ibb.co/r0THzLy/jsonEn.png)

![App Screenshot](https://i.ibb.co/nnzQ9jt/jsonEs.png)

![App Screenshot](https://i.ibb.co/tJPCSyQ/walletfactory.png)
