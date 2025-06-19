import dayjs from 'dayjs';
import { Clock, MapPin, User } from 'lucide-react';
import { ComponentProps } from 'react';
import { convertDate, formatStartDate } from '../../utils/convert-date';
import { capitalizeFirstLetterOfWords } from '../../utils/transform-text';
import { badgeStyles, DefaultBadge, StatusBadge } from '../BadgeStatus';
import Countdown from '../Countdown';
import { BadgeSLA, Container, OrderDetails } from './styles';
import { isAllowedToviewItem, IT_WORKGROUPS_SEQUENCES } from '../../utils/allowed-to-view';
import { useSearchOrder } from '../../hooks/useSearchOrder';
import { useSearch } from '../../contexts/SearchContext';

export interface OrderProps extends ComponentProps<'button'> {
    damage: string
    date_order: string
    dt_fim_desejado: string
    dt_inicio_previsto: string
    location: string
    number: number
    requester: string
    contact?: string
    group: number
    group_planej: number
    describe: string
    awaiting_validate: string
    stage: string
    qtd_historico: number
}

export function Order({
    damage,
    date_order,
    location,
    number,
    requester,
    contact,
    stage,
    dt_inicio_previsto,
    dt_fim_desejado,
    qtd_historico,
    group
}: OrderProps) {
    let colorType = badgeStyles[stage].border

    const dateToConsider = qtd_historico < 1 ? dt_inicio_previsto : dt_fim_desejado
    const isExpired = dayjs(dateToConsider).diff(dayjs().add(-3, 'hour'), 'minute') <= 0 ? true : false

    const whichBadgeToShow = qtd_historico < 1 ? (
        <DefaultBadge textColor={badgeStyles[stage].color} bgColor={badgeStyles[stage].background} borderColor={badgeStyles[stage].border}>
            <strong>Iniciar</strong> até {formatStartDate(dt_inicio_previsto)}
        </DefaultBadge>
    ) : (
        <DefaultBadge textColor={badgeStyles[stage].color} bgColor={badgeStyles[stage].background} borderColor={badgeStyles[stage].border}>
            <strong>Finalizar</strong> até {formatStartDate(dt_fim_desejado)}
        </DefaultBadge>
    )

    return (
        <Container>
            <OrderDetails color={colorType}>
                {IT_WORKGROUPS_SEQUENCES.includes(group) && (
                    <BadgeSLA isExpired={isExpired}>
                        <Countdown endTime={dateToConsider} />
                    </BadgeSLA>)
                }
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div className='details'>
                        <span className='title'>{number + ' ' + damage}</span>
                        <div className='infos'>
                            <User size={16} color='#a1a1aa' />
                            <span>{capitalizeFirstLetterOfWords(requester)} - {contact}</span>
                        </div>
                        <div className='infos'>
                            <MapPin size={16} color='#a1a1aa' />
                            <span>{capitalizeFirstLetterOfWords(location)}</span>
                        </div>
                        <div className='infos' style={{ marginBottom: '0.25rem' }}>
                            <Clock size={16} color='#a1a1aa' />
                            <span>{convertDate(date_order)}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <StatusBadge status={stage} />
                            {IT_WORKGROUPS_SEQUENCES.includes(group) && whichBadgeToShow}
                        </div>
                    </div>
                </div>
            </OrderDetails>
        </Container >
    )
}