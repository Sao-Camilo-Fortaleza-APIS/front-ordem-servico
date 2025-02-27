import { Clock, MapPin, User, UserCheck, UserPlus } from 'lucide-react';
import { ComponentProps } from 'react';
import { useLocation } from 'react-router-dom';
import { convertDate } from '../../utils/convert-date';
import { capitalizeFirstLetterOfWords } from '../../utils/transform-text';
import { Container, OrderDetails } from './styles';

export interface OrderProps extends ComponentProps<'button'> {
    damage: string
    date_order: string
    location: string
    number: number
    requester: string
    contact?: string
    group: number
    describe: string
    awaiting_validate: string
}

export function Order(props: OrderProps) {
    const { pathname: location } = useLocation()
    let colorType =
        location === '/ordens/pendentes'
            ? '#ef4444'
            : (
                (location === '/ordens/minhas') && (props.awaiting_validate === "Não")
                    // tom de laranja e verde
                    ? '#fbbf24'
                    : '#3b82f6'
            ) //#10b981

    return (
        <Container>
            <OrderDetails color={colorType}>
                <div>
                    <span className='title'>{props.damage}</span>
                    <div className='infos'>
                        <User size={16} color='#a1a1aa' />
                        <span>{capitalizeFirstLetterOfWords(props.requester)} - {props.contact}</span>
                    </div>
                    <div className='infos'>
                        <MapPin size={16} color='#a1a1aa' />
                        <span>{capitalizeFirstLetterOfWords(props.location)}</span>
                    </div>
                    <div className='infos'>
                        <Clock size={16} color='#a1a1aa' />
                        <span>{convertDate(props.date_order)}</span>
                    </div>
                </div>
                <div className='icon'>
                    {location === '/ordens/minhas' ? <UserCheck size={24} color={colorType} /> : <UserPlus size={24} color={colorType} />}
                </div>
            </OrderDetails>

            {/* <Dialog.Portal>
                    <Dialog.Overlay />
                    <DialogContent>
                        <div
                            style={{ width: '100%', display: 'flex', justifyContent: 'end', alignItems: 'end', flexDirection: 'row' }}
                        >
                            <Dialog.Close asChild>
                                <X size={32} style={{ color: '#71717a' }} />
                            </Dialog.Close>
                        </div>

                        <DialogTitle asChild>
                            <h4>{props.damage}</h4>
                        </DialogTitle>

                        <DialogDescription asChild>
                            <div>
                                {location === '/ordens/minhas' && (
                                    <>
                                        <div>
                                            <span style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                                                {props.describe}
                                            </span>
                                            <span className='infos'>
                                                <User size={16} color='#a1a1aa' />
                                                {capitalizeFirstLetterOfWords(props.requester)} - {props.contact}
                                            </span>
                                            <span className='infos'>
                                                <MapPin size={16} color='#a1a1aa' />
                                                {capitalizeFirstLetterOfWords(props.location)}
                                            </span>
                                            <span className='infos'>
                                                <Clock size={16} color='#a1a1aa' />
                                                {convertDate(props.date_order)}
                                            </span>
                                            {
                                                props.awaiting_validate === "Sim"
                                                    ? <span className='badge'>Aguardando validação</span>
                                                    : <span className='badge'>Em atendimento</span>
                                            }
                                        </div>
                                        <OrderReplyForm numberOrder={props.number} />
                                    </>
                                )}

                                {location === '/ordens/pendentes' && (
                                    <>
                                        <div>
                                            <span style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                                                {props.describe}
                                            </span>
                                            <span className='infos'>
                                                <User size={16} color='#a1a1aa' />
                                                {capitalizeFirstLetterOfWords(props.requester)} - {props.contact}
                                            </span>
                                            <span className='infos'>
                                                <MapPin size={16} color='#a1a1aa' />
                                                {capitalizeFirstLetterOfWords(props.location)}
                                            </span>
                                            <span className='infos'>
                                                <Clock size={16} color='#a1a1aa' />
                                                {convertDate(props.date_order)}
                                            </span>
                                        </div>
                                        <TakeOrderForm numberOrder={props.number} />
                                    </>
                                )}
                            </div>
                        </DialogDescription>
                    </DialogContent>
                </Dialog.Portal> */}
        </Container >
    )
}