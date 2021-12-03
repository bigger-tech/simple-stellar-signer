import WalletEnum from "../../entities/WalletEnum";
import IWallet from "../wallets/IWallet";
import PublicKey from "../../entities/PublicKey";

export default interface IState {
  open: boolean,
  availableWallets: WalletEnum[],
  publicKey?: PublicKey,
  wallets: IWallet[]
}
