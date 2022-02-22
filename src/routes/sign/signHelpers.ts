export function getParamsFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const xdrParam = urlParams.get('xdr');
    const descriptionParam = urlParams.get('description');
    let urlXdr: string;

    if (xdrParam && descriptionParam) {
        urlXdr = xdrParam.replace(/\s/g, '+');
        return { xdr: urlXdr, description: descriptionParam };
    } else if (xdrParam) {
        urlXdr = xdrParam.replace(/\s/g, '+');
        return { xdr: urlXdr, description: '' };
    } else {
        return undefined;
    }
}
