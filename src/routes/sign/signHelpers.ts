import type ITxParams from 'src/lib/transaction/ITxParams';

export function getParamsFromUrl(queryString: string): ITxParams | undefined {
    const urlParams = new URLSearchParams(queryString);
    const xdrParam = urlParams.get('xdr');
    const descriptionParam = urlParams.get('description');
    let urlXdr: string;

    if (xdrParam && descriptionParam) {
        urlXdr = xdrParam.replace(/\s/g, '+');
        return { xdr: urlXdr, description: descriptionParam, operationsDescription: [] };
    } else if (xdrParam) {
        urlXdr = xdrParam.replace(/\s/g, '+');
        return { xdr: urlXdr, description: undefined, operationsDescription: [] };
    } else {
        return undefined;
    }
}
