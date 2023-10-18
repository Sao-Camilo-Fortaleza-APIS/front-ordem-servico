import * as dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export function convertDate(date: string) {
    return dayjs(date).locale('pt-br').format('ddd, DD [de] MMM. [de] YYYY [às] HH:mm');
}

