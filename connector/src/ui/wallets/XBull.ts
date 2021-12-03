import Wallet from "./Wallet";
import PublicKey from "../../entities/PublicKey";

export default class XBull extends Wallet {
  constructor() {
    super("xBull");
  }

  async connect(): Promise<any> {
    // @ts-ignore
    return await xBullSDK.connect({
      canRequestPublicKey: true,
      canRequestSign: true,
    });
  }

  async getPublicKey(): Promise<PublicKey> {
    // @ts-ignore
    const rawPk = await xBullSDK.getPublicKey();
    return new PublicKey(rawPk);
  }
}
