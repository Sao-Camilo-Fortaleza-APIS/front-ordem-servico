import { Clock, MapPin, User, UserCheck, UserPlus } from 'lucide-react';
import { ComponentProps } from 'react';
import { useLocation } from 'react-router-dom';
import { convertDate } from '../../utils/convert-date';
import { capitalizeFirstLetterOfWords } from '../../utils/transform-text';
import { badgeStyles, StatusBadge } from '../BadgeStatus';
import { Container, OrderDetails } from './styles';

export interface OrderProps extends ComponentProps<'button'> {
    damage: string
    date_order: string
    location: string
    number: number
    requester: string
    contact?: string
    group: number
    group_planej: number
    describe: string
    awaiting_validate: string
    stage: string
}

export function Order({
    damage,
    date_order,
    location,
    number,
    requester,
    contact,
    group,
    describe,
    awaiting_validate,
    stage,
}: OrderProps) {
    const { pathname } = useLocation()

    let colorType = badgeStyles[stage].border

    return (
        <Container>
            <OrderDetails color={colorType}>
                <div>
                    <span className='title'>{damage}</span>
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
                        <StatusBadge status={stage} />
                    </div>
                </div>
                <div className='icon'>
                    {pathname === '/ordens/minhas' ? <UserCheck size={24} color={colorType} /> : <UserPlus size={24} color={colorType} />}
                </div>
            </OrderDetails>
        </Container >
    )
}