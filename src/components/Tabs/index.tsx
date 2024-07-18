import { Check } from 'lucide-react';
import { useState } from 'react';
import { NmItem } from '../../styles/RegisterServiceOrder.styles';
import { ContentListItem, TabsContent, TabsList, TabsRoot, TabsTrigger } from './styles';

export function Tabs() {
    const [selectedOptionTI, setSelectedOptionTI] = useState<number | null>(null);
    const [selectedOptionMan, setSelectedOptionMan] = useState<number | null>(null);
    const servicesTI = [
        'CFTV',
        'Controle de Acesso',
        'Criação de Usuários',
        'E-mail',
        'Fortes',
        'Internet',
        'Leitor Biométrico',
        'Painéis e Gestão à vista',
        'Suporte Tasy',
        'Suporte TIC',
        'Telefonia',
        'Totens',
    ];
    const servicesMan = [
        'Ar-condicionado',
        'Elétrica',
        'Elevadores',
        'Hidráulica',
        'Obras',
    ];

    return (
        <NmItem>
            <p>Para qual <strong>área</strong> deseja abrir a sua solicitação? {/* <b>*</b> */}</p>
            <TabsRoot>
                <TabsList aria-label='Escolha a área que deve atender sua solicitação'>
                    <TabsTrigger value='teste1'>Suporte TI</TabsTrigger>
                    <TabsTrigger value='teste2'>Manutenção Predial</TabsTrigger>
                </TabsList>
                <TabsContent value='teste1'>
                    {servicesTI.map((service, index) => (
                        <ContentListItem
                            key={index}
                            type='button'
                            isSelected={selectedOptionTI === index}
                            onClick={() => setSelectedOptionTI(index)}
                        >
                            {service}
                            {selectedOptionTI === index && <Check />}
                        </ContentListItem>
                    ))}
                </TabsContent>

                <TabsContent value='teste2'>
                    {servicesMan.map((service, index) => (
                        <ContentListItem
                            key={index}
                            type='button'
                            isSelected={selectedOptionMan === index}
                            onClick={() => setSelectedOptionMan(index)}
                        >
                            {service}
                            {selectedOptionMan === index && <Check />}
                        </ContentListItem>
                    ))}
                </TabsContent>
            </TabsRoot>
        </NmItem>
    )
}