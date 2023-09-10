import { Link } from "react-router-dom"
import { Imagem, Hospital, Logo, ContainerForm, CardForm, Btns } from "../styles"
import { BtnProx, CardMain, Topo } from "./styles"

export function MainMaterialPage(){
    return(
        <ContainerForm>
            <Imagem>
                <Hospital>
                </Hospital>
                <Logo>
                    <img src="..\src\Images\logo_horizontal.png" alt="" width={150}/>
                </Logo>
            </Imagem>
            <CardMain>
                <div className="linha" id="linha"></div>
                <Topo>
                    <div className="titulo-card">
                        <h1>Cadastro - Materiais não cobrados do paciente</h1>
                    </div>
                    <div className="aviso">
                        <p>APENAS MATERIAIS CUJO O VALOR NÃO SUPERE R$1.000,00 </p>
                        <p>PARA MATERIAIS QUE SUPERAM O VALOR DE R$1.000,00, SOLICITAR COM A CONTABILIDADE. </p>
                    </div>
                    <BtnProx>
                        <Link to={'/formulario/material'}><button id="enviar">PROSSEGUIR</button></Link>
                    </BtnProx>
                </Topo>
            </CardMain>
        </ContainerForm>
    )
}