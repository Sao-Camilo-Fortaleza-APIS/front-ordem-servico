import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export function convertDate(date: string, format?: string) {
    if (format) {
        return dayjs(date).add(3, 'hour').locale('pt-br').format(format);
    }
    // estou adicionando 3 horas para compensar o fuso horário GMT-3 (Brasília)
    return dayjs(date).add(3, 'hour').locale('pt-br').format('DD[/]MM[/]YYYY [às] HH[h]mm');
}

// COMPARAR DATA ATUAL COM A EXPIRAÇÃO DO TOKEN
export function compareDate(expiration: number): boolean {
    const now = dayjs().unix();
    console.log("now", now);

    if (expiration < now) {
        return true;
    }

    return false
}

