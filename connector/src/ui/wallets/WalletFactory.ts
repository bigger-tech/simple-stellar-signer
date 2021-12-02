import XBull from "./XBull";
import Albedo from "./Albedo";
import WalletType from "../../entities/WalletType";
import IWallet from "./IWallet";

export default function createWallet(wallet: WalletType): IWallet {
  const wallets = {
    [WalletType.X_BULL]: new XBull(),
    [WalletType.ALBEDO]: new Albedo(),
  };
  return wallets[wallet];
}
