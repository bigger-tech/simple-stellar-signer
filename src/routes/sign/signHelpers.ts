import type { ITxParams } from 'src/lib/transaction/ITxParams';

export default function getParamsFromUrl(queryString: string): ITxParams | undefined {
    const urlParams = new URLSearchParams(queryString);
    const xdrParam = urlParams.get('xdr');
    const descriptionParam = urlParams.get('description');
    let urlXdr: string;

    if (xdrParam && descriptionParam) {
        urlXdr = xdrParam.replace(/\s/g, '+');
        return { xdr: urlXdr, description: descriptionParam, transactionGroups: [] };
    } else if (xdrParam) {
        urlXdr = xdrParam.replace(/\s/g, '+');
        return { xdr: urlXdr, description: undefined, transactionGroups: [] };
    } else {
        return undefined;
    }
}
