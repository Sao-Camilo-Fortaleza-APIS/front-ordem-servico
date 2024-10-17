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
    const servicesQuali = equipamentos?.filter(equipamento => equipamento.grupo_planej === 32);
    console.log(servicesQuali)
    function updateSelectedOption(cd_equip: number, serviceType: 'ti' | 'man' | 'quali') {
        setSelectedOption(cd_equip);
        let selectService = null;
        if (serviceType === 'ti') {
            selectService = servicesTI?.find(service => service.cd_equip === cd_equip);
        } else if (serviceType === 'man') {
            selectService = servicesMan?.find(service => service.cd_equip === cd_equip);
        } else if (serviceType === 'quali') {
            selectService = servicesQuali?.find(service => service.cd_equip === cd_equip); // Adiciona verificação para 'quali'
        }
        if (onSelect) {
            onSelect(selectService || null);
        }
    }

    return (
        <NmItem>
            <p>Qual área deve atender a sua solicitação? {/* <b>*</b> */}</p>
            <TabsRoot>
                <TabsList aria-label='Escolha a área que deve atender sua solicitação'>
                    <TabsTrigger value='ti'>Suporte TI</TabsTrigger>
                    <TabsTrigger value='man'>Manutenção Predial</TabsTrigger>
                    <TabsTrigger value='quali'>Qualidade</TabsTrigger>
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

                <TabsContent value='quali'>
                    {servicesQuali?.map((service) => (
                        <ContentItem
                            key={service.cd_equip}
                            type='button'
                            isSelected={selectedOption === service.cd_equip}
                            onClick={() => updateSelectedOption(service.cd_equip, 'quali')}
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