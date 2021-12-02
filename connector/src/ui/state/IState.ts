import WalletType from "../../entities/WalletType";
import IWallet from "../wallets/IWallet";

export default interface IState {
  open: boolean,
  availableWallets: WalletType[],
  publicKey?: string,
  wallets: IWallet[]
}
