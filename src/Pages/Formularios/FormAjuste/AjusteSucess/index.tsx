import { useNavigate, useParams } from "react-router-dom";
import { Btns, ContainerForm } from "../styles";
import { BotaoAjuste, Ok } from "./styles";

export function AjusteOk() {

    const navigate = useNavigate()
    const { nr_seq_os } = useParams()

    return (
        <ContainerForm>
            <Ok>
                <h1>Solicitação feita com sucesso!</h1>
                <h3>O número da sua Ordem de serviço é: <b>{nr_seq_os}</b></h3>
                <div className="conteudo">
                    <img src="https://imagepng.org/wp-content/uploads/2019/12/check-icone-2.png" alt="" height={200} />
                </div>
                <BotaoAjuste>
                    <button onClick={() => { navigate('/') }} id="enviar">Fazer uma nova solicitação!</button>
                </BotaoAjuste>
            </Ok>
        </ContainerForm>
    )
}