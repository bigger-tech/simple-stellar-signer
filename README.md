# Simple Stellar Signer

## Local development

```
npm install
npm run dev
```

## Toolchain

This project is built using the Svelte framework along with TypeScript. It uses Cypress for E2E/integration tests, and Jest for Unit Tests

To ensure we keep the quality of the code at the maximum possible we use ESLint as a Linter and Prettier as a Code Formatter

We also use Husky to automatically run lint-staged when making a commit, being able to commit only if lint-staged passes with no errors.

To make sure we have the same coding style/rules we use https://editorconfig.org/
