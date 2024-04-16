import * as Accordion from '@radix-ui/react-accordion';
import { Clock, Hourglass, MapPin } from 'lucide-react';
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
    return (
        <Container>
            <AccordionItem value={props.number.toString()}>
                <AccordionTrigger>
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
                        <Hourglass size={24} color='#f59e0b' />
                    </div>
                </AccordionTrigger>
                <AccordionContent aria-hidden>
                    <p><strong>Dano:</strong> {props.damage}</p>
                    <p>{props.requester}</p>
                    <p><strong>Número:</strong> {props.number}</p>
                    <p><strong>Contato:</strong> {props.contact}</p>
                </AccordionContent>
            </AccordionItem>
        </Container>
    )
}