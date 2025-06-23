import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export function convertDate(date: string | Date, format?: string) {
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

export const formatStartDate = (startTime: string): string => {
    const now = dayjs()
    const start = dayjs(startTime)
    const isToday = now.isSame(start, 'day')

    if (isToday) {
        return start.add(3, 'hour').format('HH:mm')
    }
    return start.add(3, 'hour').format('DD/MM [às] HH:mm')
}

