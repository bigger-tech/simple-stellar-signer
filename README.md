# Simple Signer

Simple Signer provides an easy and secure way to implement log in and transaction signing functionality on your website.

It can be embedded on any website and supports multiple wallets and languages.

## Supported wallets

<table>
    <thead>
        <tr>
            <th>Wallet</th>
            <th>Link</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>xBull</td>
        <td><a href="https://xbull.com">xbull.com</a></td>
        <td>Implemented</td>
    </tr>
    <tr>
        <td>xBull</td>
        <td><a href="https://xbull.com">xbull.com</a></td>
        <td>Implemented</td>
    </tr>
        <tr>
        <td>xBull</td>
        <td><a href="https://xbull.com">xbull.com</a></td>
        <td>Implemented</td>
    </tr>
    <tr>
        <td>Ledger</td>
        <td><a href="https://ledger.com">ledger.com</a></td>
        <td>In progress</td>
    </tr>
    </tbody>
</table>

## Supported languages

See the [documentation on languages](https://github.com/PlutoDAO/simple-stellar-signer/blob/main/docs/languages.md) if you want to contribute.

<table>
    <thead>
        <tr>
            <th>Language</th>
            <th>Link</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>English</td>
        <td><a href="https://github.com/PlutoDAO/simple-stellar-signer/blob/main/src/lib/i18n/languages/english.json">Link to the English definition file</a></td>
    </tr>
    <tr>
        <td>Spanish</td>
        <td><a href="https://github.com/PlutoDAO/simple-stellar-signer/blob/main/src/lib/i18n/languages/spanish.json">Link to the Spanish definition file</a></td>
    </tr>
    </tbody>
</table>

---

# How to implement Simple Signer on your website

Simple Signer provides two endpoints, `/connect` and `/sign`.

## Connecting to a wallet to obtain the user's public key

When you open `/connect`, Simple Signer will prompt the user to log in. Once the user is logged in, Simple Signer will send a message to your website with the Public Key of the logged in account and the wallet used.

// TODO: Extremely concise example of how to open a connect window and listen to the incoming message, and validating that the public key is valid using KeyPair.fromPublic()

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/10.1.0/stellar-sdk.min.js"
      integrity="sha512-EqNQsxKR6rZ5xKl29xXa+ez7xgtVSUpj9UDzZmTqoyF0wHbusLkrP8S7dOsKa9DmkoHbssoWUA4+n/0KYY1EAQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
  </head>
  <body>
    <button onclick="openConnectWindow()">Connect</button>
    <script>
      const simpleSignerURL = "https://localhost:3001";

      function openConnectWindow() {
        window.open(
          `${simpleSignerURL}/connect`,
          "Connect_Window",
          "width=360, height=450"
        );
      }

      function handleMessage(e) {
        if (e.origin !== `${simpleSignerURL}`) {
          return;
        }

        const messageEvent = e.data;

        if (messageEvent.type === "onConnect") {
          const publicKey = messageEvent.message.publicKey;
          if (StellarSdk.Keypair.fromPublicKey(publicKey)) {
            console.log(messageEvent.message);
          }
        }
      }
      window.addEventListener("message", handleMessage);
    </script>
  </body>
</html>



```

### Passing in custom wallets

You may choose to explicitly show certain wallets as opposed to showing all of them. You do so by using the `wallets` parameter in the URL or by sending a message to Simple Signer.

Via Url:
```javascript
const simpleSignerURL = "https://localhost:3001";

function openConnectWindow() {
        window.open(
          `${simpleSignerURL}/connect?wallets=xbull&wallets=freighter&wallets=albedo`,
          "Connect_Window",
          "width=360, height=450"
        );
}

```
Will only render the wallets `xbull`, `freighter` and `albedo`.


Via postMessage:
```javascript	
 window.addEventListener("message", (e) => {
    if (e.origin !== `${simpleSignerURL}`) {
      return;
    } else if (connectWindow && e.data.type === "onReady") {
      connectWindow.postMessage(
        { wallets: ["xbull", "albedo"] },
        `${simpleSignerURL}`
      );
    }
  });
```	
Will only render the wallets `xbull` and `albedo`.


---

## Signing a transaction

Once you generate the transaction you want the user to sign, you can present it to your customer using the `/sign` endpoint. Simple Signer will send a message back to your website with the signed transaction.

// TODO: Extremely concise example of how to open a sign window, listen to the incoming message, validate that the XDR is correct and submit the transaction

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/10.1.0/stellar-sdk.min.js"
      integrity="sha512-EqNQsxKR6rZ5xKl29xXa+ez7xgtVSUpj9UDzZmTqoyF0wHbusLkrP8S7dOsKa9DmkoHbssoWUA4+n/0KYY1EAQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
  </head>
  <body>
    <button onclick="openSignWindow()">Connect</button>
    <script>
      const simpleSignerURL = "https://localhost:3001";

      function openSignWindow(xdr, description, operationGroups) {
        const signWindow = window.open(
          `${simpleSignerURL}/sign`,
          "Sign_Window",
          "width=360, height=700"
        );

        return signWindow;
      }

      async function handleMessage(e) {
        if (e.origin !== simpleSignerURL) {
          return;
        }

        const messageEvent = e.data;

        if (messageEvent.type === "onSign") {
          const signedXdr = messageEvent.message.signedXDR;
          if (
            StellarSdk.xdr.TransactionEnvelope.validateXDR(
              signedXdr,
              "base64"
            ) === true
          ) {
            const response = await StellarSdk.submitTransaction(signedXdr);
            console.log(messageEvent.message);
          }
        }
      }
      window.addEventListener("message", handleMessage);
    </script>
  </body>
</html>


```

You may choose to pass the transaction to Simple Signer either via URL or via postMessage.

via URL

//TODO: Example on how to pass the unsigned transaction via XDR

```javascript

const simpleSignerURL = "https://localhost:3001";

function openSignWindow(xdr, description, operationGroups) {
  const signWindow = window.open(
    `${simpleSignerURL}/sign?xdr=${xdr}`,
    "Sign_Window",
    "width=360, height=700"
  );

  return signWindow;
}

```

via PostMessage

```javascript	
      function openSignWindow(xdr, description, operationGroups) {
        const signWindow = window.open(
          `${simpleSignerURL}/sign`,
          "Sign_Window",
          "width=360, height=700"
        );

        signWindow.postMessage({xdr}, `${simpleSignerHost}/`);

        return signWindow;
      }

```	

//TODO: Example on how to pass the unsigned transaction via postMessage

### Explaining your transaction

Simple Signer gives you the ability to make your transaction simpler to understand by giving you the ability to explain what it's doing.

### General description

You can add a general description to your transaction as follows

// TODO: Example of sending an unsigned tx with a description

// TODO: Image of the result

### Operation grouping

Sometimes it's useful to group operations together to explain what they are doing.

// TODO: Example of sending an unsigned with a description + grouped operations

// TODO: Image of the result

--

## Language selection

By default, Simple Signer will detect the browser's language and serve Simple Signer using this configuration. If the language found is not implemented, it defaults to English.

//TODO: Image of the interface in Spanish

A user may also choose to change the language using the interface.

//TODO: Image of the interface

## Connecting to testnet

You can access the testnet-connected version at `https://sign-test.plutodao.finance`.

---

# Contributing

## Installation

// TODO: Installation instructions

## Tech stack

//TODO: Link to tech projects

This project is built using the [Svelte framework](https://svelte.com) along with TypeScript. It uses Cypress for E2E/integration tests, and Jest for Unit Tests

To ensure we keep a high code quality, we use ESLint as a Linter and Prettier as a Code Formatter

We also use Husky to automatically run lint-staged when making a commit, being able to commit only if lint-staged passes with no errors.

To make sure we have the same coding style/rules we use <https://editorconfig.org/>

## Adding a new Language

See the [documentation on languages](https://github.com/PlutoDAO/simple-stellar-signer/blob/main/docs/languages.md) if you want to contribute.

---

Made with love in Argentina.
