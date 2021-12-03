import WalletType from "../../entities/WalletType";
import IWallet from "../wallets/IWallet";
import PublicKey from "../../entities/PublicKey";

export default interface IState {
  open: boolean,
  availableWallets: WalletType[],
  publicKey?: PublicKey,
  wallets: IWallet[]
}
