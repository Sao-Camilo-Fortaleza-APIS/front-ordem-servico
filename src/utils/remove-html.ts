export function removeHTML(stringHTML: any): string | boolean {
    if ((stringHTML === null) || (stringHTML === '')) {
        return false;
    }
    else {
        stringHTML = stringHTML.toString();
    }


    /**
     * /<\/?(html|body)>/gi
     * /(<([^>]+)>)/ig
     */
    const regex = /<html(?:\s+\w+="[^"]*")*\s*>|<\/html\s*>|<body(?:\s+\w+="[^"]*")*\s*>|<\/body\s*>/gi;
    const stringWithoutHTML = stringHTML.replace(regex, '');

    return stringWithoutHTML;
}
