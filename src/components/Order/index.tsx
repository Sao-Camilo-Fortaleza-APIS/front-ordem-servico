import { BellDot, Clock, MapPin, Settings } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { convertDate } from '../../utils/convert-date';
import { capitalizeFirstLetterOfWords } from '../../utils/transform-text';
import { AccordionContent, AccordionItem, AccordionTrigger, Container } from './styles';

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
    let colorType = filtro === 'do-executor' ? '#f59e0b' : '#60a5fa';

    return (
        <Container>
            <AccordionItem value={props.number.toString()}>
                <AccordionTrigger color={filtro || 'do-executor'}>
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
                        {filtro === 'do-executor' ? <Settings size={24} color={colorType} /> : <BellDot size={24} color='#60a5fa' />}
                    </div>
                </AccordionTrigger>
                <AccordionContent color={filtro || 'do-executor'} aria-hidden>
                    <p><strong>Dano:</strong> {props.damage}</p>
                    <p>{props.requester}</p>
                    <p><strong>Número:</strong> {props.number}</p>
                    <p><strong>Contato:</strong> {props.contact}</p>
                </AccordionContent>
            </AccordionItem>
        </Container>
    )
}