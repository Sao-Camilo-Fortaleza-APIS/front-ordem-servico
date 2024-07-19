import { Check } from 'lucide-react';
import { useState } from 'react';
import { NmItem } from '../../styles/RegisterServiceOrder.styles';
import { ContentItem, TabsContent, TabsList, TabsRoot, TabsTrigger } from './styles';

export interface Equipamento {
    cd_equip: number;
    cd_group_trab: number;
    ds_equip: string;
    ds_group_trab: string;
    grupo_planej: number;
    servicos: string[];
}

interface TabsProps {
    equipamentos: Equipamento[] | null;
    onSelect?: (selectedEquipamento: Equipamento | null) => void;
}
export function Tabs({ equipamentos = [], onSelect }: TabsProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const servicesTI = equipamentos?.filter(equipamento => equipamento.grupo_planej === 28);
    const servicesMan = equipamentos?.filter(equipamento => equipamento.grupo_planej === 26);

    function updateSelectedOption(cd_equip: number, serviceType: 'ti' | 'man') {
        setSelectedOption(cd_equip);
        const selectService = serviceType === 'ti' ? (servicesTI && servicesTI[cd_equip]) : (servicesMan && servicesMan[cd_equip]);
        if (onSelect) {
            onSelect(selectService || null);
        }
    }

    return (
        <NmItem>
            <p>Para qual <span>área</span> deseja abrir a sua solicitação? {/* <b>*</b> */}</p>
            <TabsRoot>
                <TabsList aria-label='Escolha a área que deve atender sua solicitação'>
                    <TabsTrigger value='ti'>Suporte TI</TabsTrigger>
                    <TabsTrigger value='man'>Manutenção Predial</TabsTrigger>
                </TabsList>
                <TabsContent value='ti'>
                    {servicesTI?.map((service) => (
                        <ContentItem
                            key={service.cd_equip}
                            type='button'
                            isSelected={selectedOption === service.cd_equip}
                            onClick={() => updateSelectedOption(service.cd_equip, 'ti')}
                        >
                            {service.ds_equip}
                            {selectedOption === service.cd_equip && <Check />}
                        </ContentItem>
                    ))}
                </TabsContent>

                <TabsContent value='man'>
                    {servicesMan?.map((service) => (
                        <ContentItem
                            key={service.cd_equip}
                            type='button'
                            isSelected={selectedOption === service.cd_equip}
                            onClick={() => updateSelectedOption(service.cd_equip, 'man')}
                        >
                            {service.ds_equip}
                            {selectedOption === service.cd_equip && <Check />}
                        </ContentItem>
                    ))}
                </TabsContent>
            </TabsRoot>
        </NmItem>
    )
}