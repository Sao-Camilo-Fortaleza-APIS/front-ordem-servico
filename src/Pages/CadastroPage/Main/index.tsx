import { Link } from "react-router-dom";
import { ContainerForm } from "../../Formularios/FormMaterial/styles";
import { Botoes } from "./styles";

export function CadastroPage(){
    return(
        <ContainerForm id="rotas">
            <h1 id="cadastro-page">Planilhas de registro</h1>
            <Botoes>
                <Link to={''}>
                    <button>Cadastro de material</button>
                </Link>
                <Link to={''}>
                    <button>Cadastro assistencial</button>
                </Link>
                <Link to={''}>
                    <button>Registro de incoformidades</button>
                </Link>
            </Botoes>
        </ContainerForm>
    )
}