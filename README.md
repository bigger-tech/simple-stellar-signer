# Simple Signer

Simple Signer is a simple tool for signing transactions with Stellar. It can be embedded on any website and it supports multiple wallets. Simple Signer provides an easy and secure way to implement log in and transaction signing functionality on your website.

---

# How to implement Simple Signer on your website

Simple Signer provides two endpoints, `/connect` and `/sign`.

## Connecting to a wallet to obtain the user's public key

When you open `/connect`, Simple Signer will prompt the user to log in. Once the user is logged in, Simple Signer will send a message to your website with the Public Key of the logged in account and the wallet used.

// TODO: Extremely concise example of how to open a connect window and listen to the incoming message, and validating that the public key is valid using KeyPair.fromPublic()

### Passing in custom wallets

You may choose to explicitly show certain wallets as opposed to showing all of them. You do so by using the `wallets` parameter in the URL or by sending a message to Simple Signer.

Via Url:
// TODO: Example on how to pass the parameter via URL

Via postMessage:
// TODO: Example on how to send the message via postMessage

---

## Signing a transaction

Once you generate the transaction you want the user to sign, you can present it to your customer using the `/sign` endpoint. Simple Signer will send a message back to your website with the signed transaction.

// TODO: Extremely concise example of how to open a sign window, listen to the incoming message, validate that the XDR is correct and 

You may choose to pass the transaction to Simple Signer either via URL or via postMessage.

via URL

//TODO: Example on how to pass the unsigned transaction via XDR

via PostMessage
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


---
---
---
---

OLD

Using that Public Key, you will be able to create the desired transaction and send the XDR of the transaction to Simple Signer, either via URL `/sign?xdr=Here-Goes-The-Unsigned-XDR` or via postMessage, where the user will see all details of the transaction and decide if they want to sign it. Once the transaction is signed, Simple Signer will send the signed transaction in XDR format to the parent window, where you will be able to submit it to the network.

In the examples below you will learn how to integrate Simple Signer into your website.

# Opening the popups

```typescript
const simpleSignerHost = https://sign.plutodao.finance

function openConnectWindow(wallets?: string[]) {
    // openConnectWindow takes an argument "wallets" which is an array of wallets, that way you can choose which wallets
    // To show in the connect window. If you don't pass any wallets, it will show all wallets.
    const connectWindow = window.open(
        `${simpleSignerHost}/connect`,
        'Connect_Window',
        'width=360, height=450',
        // You can choose whatever default size you desire for the popup window, we recommend 360x450
    );

    let array: string
    if (wallets) {
        array = wallets;
    }

    window.addEventListener('message', (e) => {
        if (e.origin !== `${simpleSignerHost}`) {
            return;
            // If the message doesn't come from the correct origin, ignore it.
        } else if (connectWindow && e.data.type === 'onReady') {
            connectWindow.postMessage(
                { wallets: array },
                `${simpleSignerHost}`,
            );
            // Send the wallet array to the connect window.
        }
    });

    return connectWindow;
}
```

```typescript

const simpleSignerHost = https://sign.plutodao.finance

function openSignWindow(
    xdr: string,
    description?: string,
    operationGroups?: { from: number; to: number; description: string }[],
) {
    /* openSignWindow takes an argument "xdr" which is the XDR of the transaction you want the user to sign.

    It also takes an optional argument "description" which is a string that will be shown as the description of the full transaction.

    It also takes an optional argument "operationGroups", in case you want to group some operations together.

    The way it works is the following:

    "From" and "to" are the indexes of the operations you want to group together.
    Description is the title (or description) of the group.
    You can create multiple groups of operations, each with their own description */

    const signWindow = window.open(
        `${simpleSignerHost}/sign`,
        'Sign_Window',
        'width=450, height=350',
        // You can choose whatever default size you desire for the popup window.
    );

    window.addEventListener('message', (e) => {
        if (e.origin !== `${simpleSignerHost}`) {
            return;
            // If the message doesn't come from the correct origin, ignore it.
        } else if (signWindow && e.data.type === 'onReady') {
            signWindow.postMessage(
                { xdr, description, operationGroups },
                `${simpleSignerHost}`,
            );
            // Send the unsigned XDR transaction to the sign window along with the optional description and operation groups.
        }
    });

    return signWindow;
}
```

## Handling the messages coming from Simple Signer

There are to main types of messages that you will receive from Simple Signer: onConnect and onSign.

You will use the onConnect message to get the Public Key of the logged in account, which you will need to build a transaction for the user to sign

And you will use the onSign message to get the signed transaction in XDR format, which you will then proceed to submit to the network.

```typescript

const simpleSignerHost = https://sign.plutodao.finance

let publicKey: string

function handleMessage(e: MessageEvent) {
    if (e.origin !== simpleSignerHost) {
        return;
        // If the message doesn't come from the correct origin, ignore it.
    }

    const messageEvent = e.data;

    if (messageEvent.type === 'onConnect') {
        const publicKeyEvent = messageEvent.message.publicKey;
        // The public key of the logged in account. You will need it to build the transaction you want the user to sign.

        if (StrKey.isValidEd25519PublicKey(publicKeyEvent)) {
            publicKey = publicKeyEvent;
            console.log(messageEvent.message);
        }
    }
    if (messageEvent.type === 'onSign') {
        const signedXdr = messageEvent.message.signedXDR;
        if (signedXdr) {
            $xdr = signedXdr;
            console.log(messageEvent.message);
        }
    }
}
window.addEventListener('message', handleMessage);


async function sendTx() {
    const xdrUnsigned = await buildTransaction(publicKey);
    // Build desired transaction as usual using the Stellar SDK.
    return openSignWindow(xdrUnsigned, 'This is a payment', [
        {
            from: 0,
            to: 5,
            description: 'You stake 100 yUSDC on PlutoDAO',
            title: 'Payment and Create Account',
        },
    ]);
}

```

## Testnet

You can access the testnet-connected version at `https://sign-test.plutodao.finance`.

## Built with

This project is built using the Svelte framework along with TypeScript. It uses Cypress for E2E/integration tests, and Jest for Unit Tests

To ensure we keep the quality of the code at the maximum possible we use ESLint as a Linter and Prettier as a Code Formatter

We also use Husky to automatically run lint-staged when making a commit, being able to commit only if lint-staged passes with no errors.

To make sure we have the same coding style/rules we use https://editorconfig.org/

## Getting started

## Installation
