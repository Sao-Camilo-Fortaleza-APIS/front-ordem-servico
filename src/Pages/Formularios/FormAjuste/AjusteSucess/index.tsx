import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DragDrop } from "../../../../components/DragDrop";
import { Header } from "../../../../components/Header";
import { Btns } from "../../../../styles/RegisterServiceOrder.styles";
import { ContainerForm } from "../styles";
import { Ok } from "./styles";

export function AjusteOk() {

    const navigate = useNavigate()
    const { nr_seq_os } = useParams()

    const location = useLocation()
    const userMaiusculo = location.state?.userMaiusculo
    return (
        <ContainerForm>
            <Header />
            <Ok>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem', padding: '0 0.5rem', }}>
                    <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        Solicitação aberta com sucesso
                        <img src="https://imagepng.org/wp-content/uploads/2019/12/check-icone-2.png" alt="" height={32} />
                    </h1>

                    <h3> O número da sua Ordem de serviço é: <span>{nr_seq_os}</span></h3>

                </div>

                <span>Agora você pode também anexar arquivos diretamente na Ordem de serviço</span>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                    <DragDrop
                        numberOrder={Number(nr_seq_os)}
                        open={true}
                        onOpenChange={() => { }}
                        colorScheme="red"
                    />
                </div>

                <div style={{ width: '100%', padding: '0 0.5rem' }}>
                    <span style={{ width: '100%', height: '1px', backgroundColor: '#a1a1aa' }} />
                    <span style={{ margin: '0 0.5rem', color: '#71717a' }}>ou</span>
                    <span style={{ width: '100%', height: '1px', backgroundColor: '#a1a1aa' }} />
                </div>
                <Btns style={{ width: '100%', padding: '0 0.5rem', }}>
                    <button onClick={() => { navigate('/') }} className="enviar" style={{ marginTop: '0.625rem' }}>Abrir outra Ordem de Serviço</button>
                </Btns>
            </Ok>
        </ContainerForm >
    )
}