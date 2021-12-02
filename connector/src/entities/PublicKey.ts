export default class PublicKey {
  public readonly publicKey;

  constructor(publicKey: string) {
    //TODO: check that public key is valid
    this.publicKey = publicKey;
  }
}
