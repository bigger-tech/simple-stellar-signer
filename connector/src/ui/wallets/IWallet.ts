import { Dispatch, Unsubscribe } from "hyperapp";
import PublicKey from "../../entities/PublicKey";
import IState from "../state/IState";

export default interface IWallet {
  connect(): Promise<any>;

  render(): string;

  getPublicKey(): Promise<PublicKey>;

  configurePublicKeySubscriber(dispatch: Dispatch<IState>, options?: any): Unsubscribe;
}
