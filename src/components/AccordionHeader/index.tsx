import { Clock, MapPin, Phone, User } from "lucide-react";
import { useSearch } from "../../contexts/SearchContext";
import { convertDate } from "../../utils/convert-date";
import { capitalizeFirstLetterOfWords } from "../../utils/transform-text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../Accordion";
import { badgeStyles, DefaultBadge, StatusBadge } from "../BadgeStatus";

export function AccordionOrderHeader() {
    const { resultOrderData } = useSearch()
    if (!resultOrderData || Object.keys(resultOrderData).length === 0) return null // Se não houver dados, não renderiza nada
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value={`${resultOrderData?.number}`}>
                <AccordionTrigger>
                    <div className="number-and-title">
                        <span>{resultOrderData?.number}</span>
                        <span>{resultOrderData?.damage}</span>
                    </div>
                </AccordionTrigger>

                <AccordionContent>
                    <div>
                        <span className='title'>{resultOrderData?.damage}</span>
                        <span className='infos'>{resultOrderData?.describe}</span>
                        <div style={{ width: '100%', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }} >
                            <StatusBadge status={resultOrderData?.stage} />
                            {resultOrderData?.stage && (
                                <DefaultBadge
                                    textColor={badgeStyles[resultOrderData?.stage].color}
                                    bgColor={badgeStyles[resultOrderData?.stage].background}
                                    borderColor={badgeStyles[resultOrderData?.stage].border}
                                >
                                    {resultOrderData?.executor ? resultOrderData?.executor : 'Sem executor previsto'}
                                </DefaultBadge>
                            )}
                        </div>

                        <span className='infos'>
                            <User size={18} color='#6b7280' />
                            {capitalizeFirstLetterOfWords(resultOrderData?.requester)}
                        </span>

                        <span className='infos'>
                            <MapPin size={18} color='#6b7280' />
                            {capitalizeFirstLetterOfWords(resultOrderData?.location)}
                        </span>

                        <span className='infos'>
                            <Clock size={18} color='#6b7280' />
                            {convertDate(resultOrderData?.date_order)}
                        </span>

                        <span className='infos'>
                            <Phone size={18} color='#6b7280' />
                            {resultOrderData?.contact}
                        </span>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}