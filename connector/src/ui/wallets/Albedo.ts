import { Dispatch, Unsubscribe } from "hyperapp";
import html from "hyperlit";
import Wallet from "./Wallet";
import IState from "../state/IState";
import PublicKey from "../../entities/PublicKey";

export default class Albedo extends Wallet {
  constructor() {
    super("Albedo");
  }

  render(): [any, (() => any)[]] {
    return html`
      <script src='https://albedo.link/albedo-intent-button.js'
              x-intent='public_key'
              x-token='${btoa(Math.random().toString() + Math.random().toString())}'
              x-height='30'
              x-width='200'
              x-class-name='__simple-signer-option albedo'
              x-title='Albedo'
              async>
      </script>
    `;
  }

  configurePublicKeySubscriber(dispatch: Dispatch<IState>, options?: any): Unsubscribe {
    function handler(event) {
      if (event.data.albedoIntentResult) {
        dispatch(options.action, event.data.albedoIntentResult.pubkey);
      }
    }

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }

  async getPublicKey(): Promise<PublicKey> {
    return new Promise(() => {
    });
  }
}
