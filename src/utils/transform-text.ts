export function capitalizeFirstLetterOfWords(text?: string): string {
    if (!text) {
        return 'Texto não informado';
    }
    text = text.toLowerCase();

    const words = text.split(' ');

    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    const resultString = capitalizedWords.join(" ");

    return resultString;
}