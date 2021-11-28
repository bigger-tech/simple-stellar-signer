import {app, h as _h} from "hyperapp";
import html from 'hyperlit'
import walletFactory, {Wallet} from "./wallets/walletFactory";

const h = _h;

const connectWallet = (state, wallet) => [state, [() => walletFactory(wallet)]];
const toggleOpen = (state) => ({...state, open: !state.open})
const walletOption = (wallet: Wallet) => html`
    <li>
        <a class="__simple-signer-option" href="#" onclick=${[connectWallet, wallet]}>${wallet.valueOf()}</a>
    </li>`;

export interface IState {
    open: boolean,
    wallets: Wallet[]
}

const baseState: IState = {
    open: false,
    wallets: [Wallet.X_BULL, Wallet.ALBEDO, Wallet.FREIGHTER, Wallet.RABET]
}

export const SimpleSignerConnector = {
    init(node: HTMLElement, initialState?: IState) {
        app({
            init: {
                ...baseState,
                ...initialState
            },
            view: (state) => {
                return html`
                    <div>
                        <div class="__simple-signer-dropdown ${state.open ? "__simple-signer-dropdown--open" : ""}"
                             onclick=${toggleOpen}>
                            <span class="__simple-signer-cta">Connect wallet</span>
                            <div class="__simple-signer-dropdown-content">
                                ${state.open ? html`
                                    <ul>${state.wallets.map(walletOption)}</ul>` : ''}
                            </div>
                        </div>
                    </div>`;
            },
            node: node
        });
    },
    Wallet,
    baseState
}
// @ts-ignore
window.SimpleSignerConnector = SimpleSignerConnector;
