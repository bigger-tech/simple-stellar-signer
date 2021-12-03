export default class PublicKey {
  public readonly value;

  constructor(publicKey: string) {
    //TODO: check that public key is valid
    this.value = publicKey;
  }
}
