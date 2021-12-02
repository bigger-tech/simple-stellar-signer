import html from "hyperlit";
import IWallet from "../ui/wallets/IWallet";

export const walletOption = (wallet: IWallet) => html`
  <li>${wallet.render()}</li>`;
