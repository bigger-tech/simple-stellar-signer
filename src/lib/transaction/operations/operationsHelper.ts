import type { SignerKeyOptions } from 'stellar-sdk';

export function instanceOfEd25519PublicKey(object: SignerKeyOptions): object is SignerKeyOptions.Ed25519PublicKey {
    return 'ed25519PublicKey' in object;
}

export function instanceOfSha256(object: SignerKeyOptions): object is SignerKeyOptions.Sha256Hash {
    return 'sha256Hash' in object;
}

export function instanceOfPreAuthTx(object: SignerKeyOptions): object is SignerKeyOptions.PreAuthTx {
    return 'preAuthTx' in object;
}
