import { app, Dispatchable, Effect, h as _h, Subscription } from "hyperapp";
import html from "hyperlit";
import createWallet from "./ui/wallets/WalletFactory";
import WalletEnum from "./entities/WalletEnum";
import IState from "./ui/state/IState";
import { setPublicKey, toggleOpen } from "./ui/actions/actions";
import { walletOption } from "./ui/components/components";
import { getConnectedPublicKey } from "./ui/effects/effects";
import IWallet from "./ui/wallets/IWallet";

const h = _h;

const baseState: IState = {
  open: false,
  availableWallets: [WalletEnum.X_BULL, WalletEnum.ALBEDO, WalletEnum.FREIGHTER, WalletEnum.RABET],
  publicKey: null,
  wallets: [],
};

export const SimpleSignerConnector = {
  baseState,
  Wallet: WalletEnum,
  publicKeyConnectedCallback(publicKey: string) {
  },
  onPublicKeyConnected(callback) {
    SimpleSignerConnector.publicKeyConnectedCallback = callback;
  },
  init(node: HTMLElement, initialState?: IState) {
    const wallets = initialState.availableWallets.map(wallet => createWallet(wallet));
    app({
      init: [{
        ...baseState,
        ...initialState,
        wallets,
      }, [getConnectedPublicKey, wallets] as Effect<IState, IWallet[]>] as Dispatchable<IState>,
      view: (state) => {
        return html`
          <div>
            <div class="__simple-signer-dropdown ${state.open ? "__simple-signer-dropdown--open" : ""}"
                 onclick=${toggleOpen}>

              ${state.publicKey ? html`
                  <span>Connected with ${state.publicKey.value.substring(0, 5).concat("...")}</span>` :
                html`<span class="__simple-signer-cta">Connect wallet</span>`
              }

              <div class="__simple-signer-dropdown-content">
                ${state.open ? html`
                  <ul>${state.wallets.map(walletOption)}</ul>` : ""}
              </div>
            </div>
          </div>`;
      },
      subscriptions: state => [...state.wallets.map(w => [w.configurePublicKeySubscriber, { action: setPublicKey }] as Subscription<IState>)],
      node: node,
    });
  },
};
// @ts-ignore
window.SimpleSignerConnector = SimpleSignerConnector;
