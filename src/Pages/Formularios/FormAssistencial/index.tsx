import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Aviso, Btns, CardForm, ContainerForm, Hospital, Imagem, Logo, NmItem, Radios, Solicitante, Top } from "../FormMaterial/styles";

export function FormAssPage(){
    const [padrao, setPadrao] = useState('')
    const [estocavel, setEstocavel] = useState('')
    const [grupo, setGrupo] = useState('')
    
    const navigate = useNavigate()

    return(
        <ContainerForm>
            <Imagem>
                <Hospital>
                </Hospital>
                <Logo>
                    <img src="..\src\Images\logo_horizontal.png" alt="" width={150}/>
                </Logo>
            </Imagem>
            <CardForm>
                <div className="meio">
                    <form action="">
                        <Top>
                            <div className="titulo" id="titulo">
                                <h2>Cadastro de material ASSISTENCIAL</h2>
                            </div>
                            <Solicitante>
                                <p>E-mail solicitante: <b>*</b></p>
                                <input type="text" placeholder="Ex: cadastro@saocamilofortaleza.org.br"/>
                                <Aviso>
                                    <p>Os códigos cadastrados serão enviados para este e-mail!</p>
                                </Aviso>
                            </Solicitante>
                        </Top>
                        <NmItem>
                            <p>Descrição - Nome do item: <b>*</b></p>
                            <input type="text" placeholder="Sua resposta" />
                        </NmItem>
                        <NmItem id="ref">
                            <p>Referencia: <b>*</b></p>
                            <Aviso>
                                <div id="avpreto">
                                    <p>Número de Referência do Item solicitado - Encontrado normalmente em manuais, na etiqueta do Item ou na descrição técnica quando procurado na internet (Exemplo - Fio Kirschner - Ref.: PR8343)</p>
                                </div>
                            </Aviso>
                            <input type="text" placeholder="Sua resposta" />
                        </NmItem>
                        <NmItem>
                            <p>Registro Anvisa <b>*</b></p>
                            <input type="text" placeholder="Sua resposta" />
                        </NmItem>
                        <NmItem>
                            <p>Unidade de medida <b>*</b></p>
                            <input type="text" placeholder="Sua resposta" />
                        </NmItem>
                        <Radios>
                            <p>Grupo Material<b>*</b></p>
                            <div className="dietas">
                                <input type="radio" value="Dietas Enterais e Parenterais" checked={grupo === "Dietas Enterais e Parenterais"} onChange={e => setGrupo(e.target.value)}/>
                                <p>Dietas Enterais e Parenterais</p>
                            </div>
                            <div className="material">
                                <input type="radio" value="Material de Uso do Paciente" checked={grupo === "Material de Uso do Paciente"} onChange={e => setGrupo(e.target.value)}/>
                                <p>Material de Uso do Paciente</p>
                            </div>
                            <div className="opme">
                                <input type="radio" value="OPME / Hemodinâmica" checked={grupo === "OPME / Hemodinâmica"} onChange={e => setGrupo(e.target.value)}/>
                                <p>OPME / Hemodinâmica</p>
                            </div>
                        </Radios>
                        <Radios>
                            <p>Padronizado <b>*</b></p>
                            <div className="sim">
                                <input type="radio" value="Sim" checked={padrao === "Sim"} onChange={e => setPadrao(e.target.value)}/>
                                <p>Sim</p>
                            </div>
                            <div className="nao">
                                <input type="radio" value="Não" checked={padrao === "Não"} onChange={e => setPadrao(e.target.value)}/>
                                <p>Não</p>
                            </div>
                        </Radios>
                        <Radios>
                            <p>Material Estocável <b>*</b></p>
                            <div className="sim">
                                <input type="radio" value="Sim" id="radio" checked={estocavel === "Sim"} onChange={e => setEstocavel(e.target.value)}/>
                                <p>Sim</p>
                            </div>
                            <div className="nao">
                                <input type="radio" value="Não" id="radio" checked={estocavel === "Não"} onChange={e => setEstocavel(e.target.value)}/>
                                <p>Não</p>
                            </div>
                        </Radios>
                        <NmItem>
                            <p>Informações adicionais</p>
                            <input type="text" placeholder="Alguma observação" />
                        </NmItem>
                        <Btns>
                            <button onClick={() =>{navigate('/')}} id="voltar">Voltar</button>
                            <button id="enviar" type="submit">Enviar</button>
                        </Btns>
                    </form>
                </div>
            </CardForm>
        </ContainerForm>
    )
}