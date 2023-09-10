import { Link } from "react-router-dom";
import { BtnsMain, ContainerMain, MainCard } from "./styles";

export function MainPage(){
    return(
        <ContainerMain>
            <MainCard>
                <div className="logo">
                    <img src="src\Images\logo_horizontal.png" alt="" height={200}/>
                </div>
                <div className="titulo">
                    <h2>Solicitações para Central de Cadastro</h2>
                </div>
                <BtnsMain>
                    <Link to={'/formulario/ajuste'}><button>Abrir uma nova ordem de serviço</button></Link>
                </BtnsMain>
            </MainCard>
        </ContainerMain>
    )
}