import IState from "../state/IState";
import IWallet from "../wallets/IWallet";
import { setPublicKey } from "../actions/actions";
import { Action, Dispatch } from "hyperapp";
import PublicKey from "../../entities/PublicKey";
import { SimpleSignerConnector } from "../../index";

export const getConnectedPublicKey = async (dispatch: Dispatch<IState>, wallets: IWallet[]) => {
  const pk = await Promise.race(wallets.map(wallet => wallet.getPublicKey()));
  dispatch(setPublicKey as Action<IState>, pk);
};

export const broadcastConnectedPublicKey = async (dispatch: Dispatch<IState>, publicKey: PublicKey) => {
  SimpleSignerConnector.publicKeyConnectedCallback(publicKey.value);
};
