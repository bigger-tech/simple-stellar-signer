# Simple Stellar Signer

## Usage

```typescript
const simpleSignerHost = process.env.VITE_HOST_SIMPLE_SIGNER;

export function openConnectWindow(wallets?: string[]) {
    const connectWindow = window.open(
        `${simpleSignerHost}/connect`,
        'Connect_Window',
        'width=360, height=450',
    );

    let array: string[] = [];
    if (wallets) {
        array = wallets;
    }

    window.addEventListener('message', (e) => {
        if (e.origin !== `${simpleSignerHost}`) {
            return;
        } else if (connectWindow && e.data.type === 'onReady') {
            connectWindow.postMessage(
                { wallets: array },
                `${simpleSignerHost}`,
            );
        }
    });

    return connectWindow;
}
export async function openSignWindow(
    xdr: string,
    description?: string,
    operationGroups?: { from: number; to: number; description: string }[],
) {
    const signWindow = window.open(
        `${simpleSignerHost}/sign`,
        'Sign_Window',
        'width=450, height=350',
    );

    window.addEventListener('message', (e) => {
        if (e.origin !== `${simpleSignerHost}`) {
            return;
        } else if (signWindow && e.data.type === 'onReady') {
            signWindow.postMessage(
                { xdr, description, operationGroups },
                `${simpleSignerHost}`,
            );
        }
    });

    return signWindow;
}
```

## Built with

This project is built using the Svelte framework along with TypeScript. It uses Cypress for E2E/integration tests, and Jest for Unit Tests

To ensure we keep the quality of the code at the maximum possible we use ESLint as a Linter and Prettier as a Code Formatter

We also use Husky to automatically run lint-staged when making a commit, being able to commit only if lint-staged passes with no errors.

To make sure we have the same coding style/rules we use https://editorconfig.org/

## Getting started

## Installation
