import { SignerKeyOptions, StrKey } from 'stellar-sdk';
import InvalidSignerTypeError from 'src/lib/errors/InvalidSignerTypeError';

export function instanceOfEd25519PublicKey(object: SignerKeyOptions): object is SignerKeyOptions.Ed25519PublicKey {
    return 'ed25519PublicKey' in object;
}

export function instanceOfSha256(object: SignerKeyOptions): object is SignerKeyOptions.Sha256Hash {
    return 'sha256Hash' in object;
}

export function instanceOfPreAuthTx(object: SignerKeyOptions): object is SignerKeyOptions.PreAuthTx {
    return 'preAuthTx' in object;
}

export function getSignerType(object: SignerKeyOptions) {
    let type: string;

    if (instanceOfEd25519PublicKey(object)) {
        type = object.ed25519PublicKey;
        return type;
    } else if (instanceOfSha256(object)) {
        if (typeof object.sha256Hash === 'string') {
            type = object.sha256Hash;
            return type;
        } else {
            type = StrKey.encodeSha256Hash(object.sha256Hash);
            return type;
        }
    } else if (instanceOfPreAuthTx(object)) {
        if (typeof object.preAuthTx === 'string') {
            type = object.preAuthTx;
            return type;
        } else {
            type = StrKey.encodePreAuthTx(object.preAuthTx);
            return type;
        }
    } else {
        throw new InvalidSignerTypeError();
    }
}
