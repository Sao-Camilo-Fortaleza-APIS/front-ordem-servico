import * as Accordion from '@radix-ui/react-accordion';
import { Clock, Hourglass, MapPin } from 'lucide-react';
import { AccordionContent, AccordionTrigger, Container } from './styles';

export interface OrderProps {
    damage: string
    date: string
    location: string
    number: number
    requester: string
}

export function Order(props: OrderProps) {
    return (
        <Container>
            <Accordion.Item value={props.number.toString()}>
                <AccordionTrigger>
                    <div>
                        <span className='title'>{props.damage}</span>
                        <span className='infos'>
                            <Clock size={16} color='#a1a1aa' />
                            {props.date}
                        </span>
                        <span className='infos'>
                            <MapPin size={16} color='#a1a1aa' />
                            {props.location}
                        </span>
                    </div>
                    <div className='icon-card'>
                        <Hourglass size={24} color='#0EA5E9' />
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p>
                        {props.damage}
                    </p>
                    <span>
                        {props.requester}
                    </span>
                </AccordionContent>
            </Accordion.Item>
        </Container>
    )
}