import * as Accordion from '@radix-ui/react-accordion';
import { Clock, Hourglass, MapPin } from 'lucide-react';
import { AccordionContent, AccordionTrigger, Container } from './styles';

export function Order() {
    return (
        <Accordion.Root type='single' collapsible>
            <Container>
                <Accordion.Item value='item-1'>
                    <AccordionTrigger>
                        <div>
                            <span className='title'>Computador sem internet aqui na uti</span>
                            <span className='infos'>
                                <Clock size={16} color='#a1a1aa' />
                                28/02/2024 às 14:00
                            </span>
                            <span className='infos'>
                                <MapPin size={16} color='#a1a1aa' />
                                Pronto Atendimento Adulto
                            </span>
                        </div>
                        <div className='icon-card'>
                            <Hourglass size={24} color='#0EA5E9' />
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolores eos rem, molestiae itaque minima accusantium fugit
                        quas in necessitatibus explicabo sequi.
                    </AccordionContent>
                </Accordion.Item><Accordion.Item value='item-2'>
                    <AccordionTrigger>
                        <div>
                            <span className='title'>Computador sem internet aqui na uti</span>
                            <span className='infos'>
                                <Clock size={16} color='#a1a1aa' />
                                28/02/2024 às 14:00
                            </span>
                            <span className='infos'>
                                <MapPin size={16} color='#a1a1aa' />
                                Pronto Atendimento Adulto
                            </span>
                        </div>
                        <div className='icon-card'>
                            <Hourglass size={24} color='#0EA5E9' />
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolores eos rem, molestiae itaque minima accusantium fugit
                        quas in necessitatibus explicabo sequi.
                    </AccordionContent>
                </Accordion.Item><Accordion.Item value='item-3'>
                    <AccordionTrigger>
                        <div>
                            <span className='title'>Computador sem internet aqui na uti</span>
                            <span className='infos'>
                                <Clock size={16} color='#a1a1aa' />
                                28/02/2024 às 14:00
                            </span>
                            <span className='infos'>
                                <MapPin size={16} color='#a1a1aa' />
                                Pronto Atendimento Adulto
                            </span>
                        </div>
                        <div className='icon-card'>
                            <Hourglass size={24} color='#0EA5E9' />
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolores eos rem, molestiae itaque minima accusantium fugit
                        quas in necessitatibus explicabo sequi.
                    </AccordionContent>
                </Accordion.Item><Accordion.Item value='item-4'>
                    <AccordionTrigger>
                        <div>
                            <span className='title'>Computador sem internet aqui na uti</span>
                            <span className='infos'>
                                <Clock size={16} color='#a1a1aa' />
                                28/02/2024 às 14:00
                            </span>
                            <span className='infos'>
                                <MapPin size={16} color='#a1a1aa' />
                                Pronto Atendimento Adulto
                            </span>
                        </div>
                        <div className='icon-card'>
                            <Hourglass size={24} color='#0EA5E9' />
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolores eos rem, molestiae itaque minima accusantium fugit
                        quas in necessitatibus explicabo sequi.
                    </AccordionContent>
                </Accordion.Item><Accordion.Item value='item-5'>
                    <AccordionTrigger>
                        <div>
                            <span className='title'>Computador sem internet aqui na uti</span>
                            <span className='infos'>
                                <Clock size={16} color='#a1a1aa' />
                                28/02/2024 às 14:00
                            </span>
                            <span className='infos'>
                                <MapPin size={16} color='#a1a1aa' />
                                Pronto Atendimento Adulto
                            </span>
                        </div>
                        <div className='icon-card'>
                            <Hourglass size={24} color='#0EA5E9' />
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolores eos rem, molestiae itaque minima accusantium fugit
                        quas in necessitatibus explicabo sequi.
                    </AccordionContent>
                </Accordion.Item><Accordion.Item value='item-6'>
                    <AccordionTrigger>
                        <div>
                            <span className='title'>Computador sem internet aqui na uti</span>
                            <span className='infos'>
                                <Clock size={16} color='#a1a1aa' />
                                28/02/2024 às 14:00
                            </span>
                            <span className='infos'>
                                <MapPin size={16} color='#a1a1aa' />
                                Pronto Atendimento Adulto
                            </span>
                        </div>
                        <div className='icon-card'>
                            <Hourglass size={24} color='#0EA5E9' />
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolores eos rem, molestiae itaque minima accusantium fugit
                        quas in necessitatibus explicabo sequi.
                    </AccordionContent>
                </Accordion.Item>

            </Container>
        </Accordion.Root>
    )
}