import { Clock, MapPin, Phone, User } from "lucide-react";
import { useSearch } from "../../contexts/SearchContext";
import { convertDate } from "../../utils/convert-date";
import { capitalizeFirstLetterOfWords } from "../../utils/transform-text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../Accordion";
import { badgeStyles, DefaultBadge, StatusBadge } from "../BadgeStatus";

export function AccordionOrderHeader() {
    const { resultOrderData, resultHistoryData } = useSearch()
    if (!resultOrderData || Object.keys(resultOrderData).length === 0) return null // Se não houver dados, não renderiza nada
    console.log(resultOrderData?.executor)
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
                        <span className='title'>{`${resultOrderData?.number} ${resultOrderData?.damage}`}</span>
                        <span className='infos'>{resultOrderData?.describe}</span>
                        <div style={{ width: '100%', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }} >
                            <StatusBadge status={resultOrderData?.stage} />
                            {resultOrderData?.stage && ( // justificativa: o Tasy pode permitir abrir OS sem estágio
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

                        <div style={{ width: '100%', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }} >
                            {resultOrderData?.group_planej === 28
                                && resultHistoryData.length === 0
                                && resultOrderData?.executor === null
                                && (<DefaultBadge
                                    textColor={badgeStyles[resultOrderData?.stage].color}
                                    bgColor={badgeStyles[resultOrderData?.stage].background}
                                    borderColor={badgeStyles[resultOrderData?.stage].border}
                                >
                                    <h3>O atendimento dessa OS poderá ser iniciado até {convertDate(resultOrderData?.dt_inicio_previsto)}</h3>
                                </DefaultBadge>)}
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}