import { NmItem } from '../../styles/RegisterServiceOrder.styles';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from './styles';

export function Tabs() {
    return (
        <NmItem>
            <p>Para qual <strong>área</strong> deseja abrir a sua solicitação? {/* <b>*</b> */}</p>
            <TabsRoot>
                <TabsList>
                    <TabsTrigger value='teste1'>Suporte TI</TabsTrigger>
                    <TabsTrigger value='teste2'>Manutenção Predial</TabsTrigger>
                </TabsList>
                <TabsContent value='teste1'>
                    <div>Conteúdo 1</div>
                </TabsContent>

                <TabsContent value='teste2'>
                    <div>Conteúdo 2</div>
                </TabsContent>
            </TabsRoot>
        </NmItem>
    )
}