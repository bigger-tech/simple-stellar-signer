import Wallet from "./Wallet";
import PublicKey from "../../entities/PublicKey";
import IConnectResponse from "../../entities/wallets/xBull/IConnectResponse";

export default class XBull extends Wallet {
  constructor() {
    super("xBull");
  }

  async connect(): Promise<any> {
    // @ts-ignore
    return await xBullSDK.connect({
      canRequestPublicKey: true,
      canRequestSign: true,
    }) as IConnectResponse;
  }

  async getPublicKey(): Promise<PublicKey> {
    // @ts-ignore
    const rawPk = await xBullSDK.getPublicKey();
    return new PublicKey(rawPk);
  }
}
