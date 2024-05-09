import * as Dialog from '@radix-ui/react-dialog';
import { BellDot, Clock, MapPin, Settings, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { convertDate } from '../../utils/convert-date';
import { capitalizeFirstLetterOfWords } from '../../utils/transform-text';
import { Container, DialogContent, DialogTitle, OrderDetails } from './styles';

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
    const { pathname: location } = useLocation()
    let colorType = location === '/ordens/minhas' ? '#60a5fa' : '#ef4444';

    return (
        <Container>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <OrderDetails color={colorType}>
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
                            {location === '/ordens/minhas' ? <Settings size={24} color={colorType} /> : <BellDot size={24} color={colorType} />}
                        </div>
                    </OrderDetails>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay />
                    <DialogContent
                        style={{ position: 'fixed', right: '0', top: '0', bottom: '0', left: '0', padding: '2.5rem', height: '100vh', backgroundColor: '#f4f4f5', zIndex: '10', minWidth: '320px', borderLeft: '1px solid #4b5563' }}
                    >
                        <div
                            style={{ width: '100%', display: 'flex', justifyContent: 'end', alignItems: 'end', flexDirection: 'row' }}
                        >
                            <Dialog.Close asChild>
                                <X size={32} style={{ color: 'Highlight' }} />
                            </Dialog.Close>
                        </div>

                        <DialogTitle>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eligendi enim magni nostrum nesciunt sapiente.
                        </DialogTitle>

                        <Dialog.Description className="text-sm text-zinc-500">
                            <div>
                                <span className='infos'>
                                    <MapPin size={16} color='#a1a1aa' />
                                    {capitalizeFirstLetterOfWords(props.location)}
                                </span>
                                <span className='infos'>
                                    <Clock size={16} color='#a1a1aa' />
                                    {convertDate(props.date_order)}
                                </span>
                            </div>
                        </Dialog.Description>

                    </DialogContent>
                </Dialog.Portal>
            </Dialog.Root>
        </Container >
    )
}