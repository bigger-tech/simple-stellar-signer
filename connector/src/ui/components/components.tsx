import html from "hyperlit";
import IWallet from "../wallets/IWallet";

export const walletOption = (wallet: IWallet) => html`
  <li>${wallet.render()}</li>`;
