import { xdr } from '@stellar/stellar-sdk';

import { getAccountAddress, getContractAddress } from '../../soroban/GetContractFunctionInfo';

export const getMethodValue = (arg: xdr.ScVal, type?: string): xdr.ScVal | string => {
    type = (type && type.toLowerCase()) || '';
    switch (type) {
        case 'address':
        case 'scvAddress'.toLowerCase():
            if (arg.address().switch().name === 'scAddressTypeAccount')
                return getAccountAddress(arg.address().accountId().ed25519().toString('hex'));
            return getContractAddress(arg.address().contractId().toString('hex'));
        case 'scvContractInstance'.toLowerCase():
            return getContractAddress(arg.address().contractId().toString('hex'));
        case 'bytes':
        case 'scvBytes'.toLowerCase():
        case 'scvBytesN'.toLowerCase():
            return arg.bytes().toString('base64');
        case 'symbol':
        case 'scvSymbol'.toLowerCase():
            return xdr.ScVal.scvSymbol(arg.sym().toString()).value()!.toString();
        case 'scvBool'.toLowerCase():
            return xdr.ScVal.scvBool(arg != null);
        case 'i32'.toLowerCase():
        case 'scvI32'.toLowerCase():
            return arg.i32().toString();
        case 'i64'.toLowerCase():
        case 'scvI64'.toLowerCase():
            return arg.i64().low.toString();
        case 'i128'.toLowerCase():
        case 'scvI128'.toLowerCase():
            return arg.i128().lo().toString();
        case 'i256'.toLowerCase():
        case 'scvI256'.toLowerCase():
            return arg.i256().loLo().toString();
        case 'u64'.toLowerCase():
        case 'scvU64'.toLowerCase():
            return arg.u64().toString();
        case 'u32'.toLowerCase():
        case 'scvU32'.toLowerCase():
            return arg.u32().toString();
        case 'u128'.toLowerCase():
        case 'scvU128'.toLowerCase():
            return arg.u128().lo().toString();
        case 'u256'.toLowerCase():
        case 'scvU256'.toLowerCase():
            return arg.u256().loLo().toString();
        case 'timepoint'.toLowerCase():
        case 'scvTimepoint'.toLowerCase():
            return xdr.ScVal.scvTimepoint(new xdr.Uint64(arg.timepoint().high));
        case 'duration'.toLowerCase():
        case 'scvDuration'.toLowerCase():
            return xdr.ScVal.scvDuration(new xdr.Uint64(arg.duration().high));
        case 'boolean':
            return xdr.ScVal.scvBool(arg.b());
        case 'object':
            return arg.bytes().toString('base64');
        case 'scvString':
            return xdr.ScVal.scvString(arg.str());
        case 'map':
        case 'scvMap'.toLowerCase():
            return arg
                .map()!
                .map((a) => {
                    const values = getMethodValue(a.val(), a.val().switch().name);
                    const keys = getMethodValue(a.key(), a.key().switch().name);

                    return ` ${keys.toString()}: ${values} `;
                })
                .toString()
                .padStart(1, ' ');
        case 'scvVec'.toLowerCase():
            return arg
                .vec()!
                .map((param) => {
                    return getMethodValue(param, param.switch().name);
                })
                .toString();
        default:
            return arg.value()!.toString();
    }
};

export interface CustomScVal {
    type: string;
    value: string;
}
