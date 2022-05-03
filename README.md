# Simple Stellar Signer

## Usage

Simple Signer is a simple tool for signing transactions with Stellar. It can be embedded on any website and it supports multiple wallets. We believe that Simple Signer provides an easy and secure way to implement logging and signing functionality on your website.

Simple Signer provides two endpoints, /connect and /sign. When you open /connect, Simple Signer will prompt you to log in with a Wallet or using your Private Key. Once you are logged in, Simple Signer will send a message to the parent window (the website implementing Simple Signer) with the Public Key of the logged in account and the wallet used.

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

## Built with

This project is built using the Svelte framework along with TypeScript. It uses Cypress for E2E/integration tests, and Jest for Unit Tests

To ensure we keep the quality of the code at the maximum possible we use ESLint as a Linter and Prettier as a Code Formatter

We also use Husky to automatically run lint-staged when making a commit, being able to commit only if lint-staged passes with no errors.

To make sure we have the same coding style/rules we use https://editorconfig.org/

## Getting started

## Installation
