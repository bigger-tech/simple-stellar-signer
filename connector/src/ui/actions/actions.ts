import IState from "../state/IState";
import PublicKey from "../../entities/PublicKey";
import { Action } from "hyperapp";
import { broadcastConnectedPublicKey } from "../effects/effects";

export const setPublicKey = (state: IState, publicKey: PublicKey) => [{
  ...state,
  publicKey,
}, [broadcastConnectedPublicKey, publicKey]];
export const toggleOpen: Action<IState, boolean> = (state) => ({ ...state, open: !state.open });
