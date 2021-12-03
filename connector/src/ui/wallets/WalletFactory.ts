import XBull from "./XBull";
import Albedo from "./Albedo";
import WalletEnum from "../../entities/WalletEnum";
import IWallet from "./IWallet";

export default function createWallet(wallet: WalletEnum): IWallet {
  const wallets = {
    [WalletEnum.X_BULL]: new XBull(),
    [WalletEnum.ALBEDO]: new Albedo(),
  };
  return wallets[wallet];
}
