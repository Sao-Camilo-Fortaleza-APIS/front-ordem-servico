import { useNavigate, useParams } from "react-router-dom";
import { ContainerForm } from "../styles";
import { BotaoAjuste, Ok } from "./styles";
import { Btns } from "../../../../routes/RegisterServiceOrder.styles";

export function AjusteOk() {

    const navigate = useNavigate()
    const { nr_seq_os } = useParams()

    return (
        <ContainerForm>
            <Ok>
                <h1>Solicitação feita com sucesso!</h1>
                <h3>O número da sua Ordem de serviço é: <span>{nr_seq_os}</span></h3>
                <div className="conteudo">
                    <img src="https://imagepng.org/wp-content/uploads/2019/12/check-icone-2.png" alt="" height={200} />
                </div>
                <Btns>
                    <button onClick={() => { navigate('/') }} id="enviar">Fazer uma nova solicitação!</button>
                </Btns>
            </Ok>
        </ContainerForm>
    )
}