import IWallet from "./IWallet";
import html from "hyperlit";
import PublicKey from "../../entities/PublicKey";
import { Dispatch, Unsubscribe } from "hyperapp";
import IState from "../state/IState";

export default class Wallet implements IWallet {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  async connect() {
    throw new Error(`Unhandled connection for wallet ${this.name}`);
  }

  render() {
    return html`<a class="__simple-signer-option ${this.name}" href="#" onclick=${state => [state, [
      async dispatch => {
        const result = await this.connect();
        dispatch(state => state);
      },
    ]]}>${this.name}</a>`;
  }

  getPublicKey(): Promise<PublicKey> {
    throw new Error(`Unhandled getPublicKey for wallet ${this.name}`);
  }

  configurePublicKeySubscriber(dispatch: Dispatch<IState>, options?: any): Unsubscribe {
    return () => {
    };
  }
}
