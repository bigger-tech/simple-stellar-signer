export interface IGeneratedMethod {
    name: string;
    docs: string | null;
    inputs: { name: string; type: string }[];
    outputs: { type: string }[];
}

export function getStellarAssetContractFunctions(): IGeneratedMethod[] {
    return [
        {
            name: 'allowance',
            docs: null,
            inputs: [
                {
                    name: 'from',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'spender',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
            ],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_I128',
                },
            ],
        },
        {
            name: 'authorized',
            docs: null,
            inputs: [
                {
                    name: 'id',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
            ],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_BOOL',
                },
            ],
        },
        {
            name: 'approve',
            docs: null,
            inputs: [
                {
                    name: 'from',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'spender',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'amount',
                    type: 'SC_SPEC_TYPE_I128',
                },
                {
                    name: 'expiration_ledger',
                    type: 'SC_SPEC_TYPE_I32',
                },
            ],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_RESULT',
                },
            ],
        },
        {
            name: 'balance',
            docs: null,
            inputs: [
                {
                    name: 'id',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
            ],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_I128',
                },
            ],
        },
        {
            name: 'burn',
            docs: null,
            inputs: [
                {
                    name: 'from',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'amount',
                    type: 'SC_SPEC_TYPE_I128',
                },
            ],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_RESULT',
                },
            ],
        },
        {
            name: 'burn_from',
            docs: null,
            inputs: [
                {
                    name: 'spender',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'from',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'amount',
                    type: 'SC_SPEC_TYPE_I128',
                },
            ],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_I128',
                },
            ],
        },
        {
            name: 'clawback',
            docs: null,
            inputs: [
                {
                    name: 'from',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'amount',
                    type: 'SC_SPEC_TYPE_I128',
                },
            ],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_I128',
                },
            ],
        },
        {
            name: 'decimals',
            docs: null,
            inputs: [],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_RESULT',
                },
            ],
        },
        {
            name: 'mint',
            docs: null,
            inputs: [
                {
                    name: 'to',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'amount',
                    type: 'SC_SPEC_TYPE_I128',
                },
            ],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_RESULT',
                },
            ],
        },
        {
            name: 'name',
            docs: null,
            inputs: [],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_STRING',
                },
            ],
        },
        {
            name: 'set_admin',
            docs: null,
            inputs: [
                {
                    name: 'new_admin',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
            ],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_RESULT',
                },
            ],
        },
        {
            name: 'admin',
            docs: null,
            inputs: [],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_RESULT',
                },
            ],
        },
        {
            name: 'set_authorized',
            docs: null,
            inputs: [
                {
                    name: 'id',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'authorize',
                    type: 'SC_SPEC_TYPE_BOOL',
                },
            ],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_RESULT',
                },
            ],
        },
        {
            name: 'symbol',
            docs: null,
            inputs: [],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_STRING',
                },
            ],
        },
        {
            name: 'transfer',
            docs: null,
            inputs: [
                {
                    name: 'from',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'to',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'amount',
                    type: 'SC_SPEC_TYPE_I128',
                },
            ],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_RESULT',
                },
            ],
        },
        {
            name: 'transfer_from',
            docs: null,
            inputs: [
                {
                    name: 'spender',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'from',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'to',
                    type: 'SC_SPEC_TYPE_ADDRESS',
                },
                {
                    name: 'amount',
                    type: 'SC_SPEC_TYPE_I128',
                },
            ],
            outputs: [
                {
                    type: 'SC_SPEC_TYPE_RESULT',
                },
            ],
        },
    ];
}
