export function removeHTML(stringHTML: any): string | boolean {
    if ((stringHTML === null) || (stringHTML === ''))
        return false;
    else
        stringHTML = stringHTML.toString();

    const stringWithoutHTML = stringHTML.replace(/(<([^>]+)>)/ig, '');

    return stringWithoutHTML;
}
