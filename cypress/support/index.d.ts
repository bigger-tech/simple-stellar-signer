export {};

declare global {
    namespace Cypress {
        interface Chainable {
            interceptAnalytics: () => void;
        }
    }
}
