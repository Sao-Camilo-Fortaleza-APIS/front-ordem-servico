import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export function convertDate(date: string) {
    // estou adicionando 3 horas para compensar o fuso horário GMT-3 (Brasília)
    return dayjs(date).add(3, 'hour').locale('pt-br').format('ddd, DD [de] MMM. [de] YYYY [às] HH[h]mm');
}

