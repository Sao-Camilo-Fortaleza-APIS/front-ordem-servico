import { BellDot, Clock, MapPin, Settings } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { convertDate } from '../../utils/convert-date';
import { capitalizeFirstLetterOfWords } from '../../utils/transform-text';
import { Container, OrderDetails } from './styles';

export interface OrderProps {
    damage: string
    date_order: string
    location: string
    number: number
    requester: string
    contact?: string
    group: number
}

export function Order(props: OrderProps) {
    const [searchParams, setSearchParams] = useSearchParams()
    let filtro = searchParams.get('filtro') ? (searchParams.get('filtro')) : 'sem-executor'
    let colorType = filtro === 'do-executor' ? '#60a5fa' : '#ef4444';

    return (
        <Container>
            <OrderDetails color={filtro || 'do-executor'}>
                <div>
                    <span className='title'>{props.damage}</span>
                    <span className='infos'>
                        <MapPin size={16} color='#a1a1aa' />
                        {capitalizeFirstLetterOfWords(props.location)}
                    </span>
                    <span className='infos'>
                        <Clock size={16} color='#a1a1aa' />
                        {convertDate(props.date_order)}
                    </span>
                </div>
                <div className='icon'>
                    {filtro === 'do-executor' ? <Settings size={24} color={colorType} /> : <BellDot size={24} color={colorType} />}
                </div>
            </OrderDetails>
        </Container>
    )
}