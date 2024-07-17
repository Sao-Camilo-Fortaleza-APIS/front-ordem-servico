import { NmItem } from '../../styles/RegisterServiceOrder.styles';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from './styles';

export function Tabs() {
    return (
        <NmItem>
            <p>Para qual <strong>área</strong> deseja abrir a sua solicitação? {/* <b>*</b> */}</p>
            <TabsRoot>
                <TabsList className='' aria-label='Escolha a área que deve atender sua solicitação'>
                    <TabsTrigger className='' value='teste1'>Suporte TI</TabsTrigger>
                    <TabsTrigger className='' value='teste2'>Manutenção Predial</TabsTrigger>
                </TabsList>
                <TabsContent className='' value='teste1'>
                    <button className='button' type='button'>CFTV</button>
                    <button className='button' type='button'>Controle de Acesso</button>
                    <button className='button' type='button'>Criação de Usuários</button>
                    <button className='button' type='button'>E-mail</button>
                    <button className='button' type='button'>Fortes</button>
                    <button className='button' type='button'>Internet</button>
                    <button className='button' type='button'>Leitor Biométrico</button>
                    <button className='button' type='button'>Painéis e Gestão à vista</button>
                    <button className='button' type='button'>Suporte Tasy</button>
                    <button className='button' type='button'>Suporte TIC</button>
                    <button className='button' type='button'>Telefonia</button>
                    <button className='button' type='button'>Totens</button>
                </TabsContent>

                <TabsContent className='tabsContent' value='teste2'>
                    <button className='button' type='button'>Ar-condicionado</button>
                    <button className='button' type='button'>Obras</button>
                    <button className='button' type='button'>Elétrica</button>
                </TabsContent>
            </TabsRoot>
        </NmItem>
    )
}