export interface ContractFunctionInfo {
    description: string | undefined;
    name: string;
    inputs: InputInfo[];
}

export interface InputInfo {
    name: string;
}
