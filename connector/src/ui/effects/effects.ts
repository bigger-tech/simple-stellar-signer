import IState from "../state/IState";
import IWallet from "../wallets/IWallet";
import { setPublicKey } from "../actions/actions";
import { Dispatch } from "hyperapp";

export const getConnectedPublicKey = async (dispatch: Dispatch<IState>, wallets: IWallet[]) => {
  const pk = await Promise.race(wallets.map(wallet => wallet.getPublicKey()));
  dispatch(setPublicKey, pk);
};
