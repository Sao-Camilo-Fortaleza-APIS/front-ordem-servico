import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../../components/Load";
import api from "../../../services/api";
import { Aviso, Btns, CardForm, ContainerForm, Hospital, Imagem, Logo, NmItem, Radios, Solicitante, Top } from "./styles";

export function FormMaterialPage(){
    const { register,handleSubmit,formState:{ errors }, reset} = useForm();
    const [isLoading, setIsLoading] = useState(false)

    const opcoesMedida = [
        "",
        "Balde",
        "Bisnaga",
        "Bloco",
        "Bolsa",
        "Caixa",
        "Centímetro",
        "Cento",
        "Cilindro",
        "Conjunto",
        "Copo",
        "Dúzia",
        "Envelope",
        "Fardo",
        "Folhas",
        "Frasco",
        "Galão",
        "Garrafa",
        "Gramas",
        "Kilo",
        "Kit",
        "Lata",
        "Litros",
        "Maço",
        "Metro",
        "Metro Cubico",
        "Metro Quadrado",
        "Microgramas",
        "Miligramas",
        "Mililitros",
        "Milímetro",
        "Pacote",
        "Par",
        "Peça",
        "Pote",
        "Resma",
        "Rolo",
        "Sache",
        "Saco",
        "Tiras",
        "Tubo",
        "Unidade"
    ]
    const opcoesGrupo = [
        "",
        "Equipamento de Proteção Individual",
        "Materiais para Manutenção dos Equipamentos Biomédicos",
        "Impressos e Materiais de Expediente",
        "Materiais de Consumo Direto",
        "Materiais de Informática",
        "Materiais de Laboratório",
        "Materiais de Manutenção Predial",
        "Materiais de Segurança / CFTV",
        "Materiais de Segurança de Brigada",
        "Materiais e Equipamentos do Meio Ambiente",
        "Materiais de Esterilização",
        "Peças e Acessórios",
        "Produtos de Lavanderia",
        "Produtos de Limpeza",
        "Tecidos e Confecções",
        "Telefonia PABX",
        "Uniformes",
        "Outros Materiais"
    ]

    const [unidade, setUnidade] = useState(''); // unidade de medida
    const [grupo, setGrupo] = useState('') //grupo material
    const [padrao, setPadrao] = useState('') //ie_padrao
    const [estocavel, setEstocavel] = useState('') //ie_estocavel
    const [opcoes, setOpcoes] = useState([]);
    const [selectedValue, setSelectedValue] = useState(''); //Setor
    const [email, setEmail] = useState('') //Email
    const [nomeitem, setNomeitem] = useState('') //Nome material
    const [info, setInfo] = useState('') //Detalhes



    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
          const response = await fetch('http://10.10.0.200:4321/get/setor');
          const data = await response.json();
          const optionsWithBlank = [{ id: "", name: "Selecione uma opção" }, ...data];
          setOpcoes(optionsWithBlank);
        }
        fetchData();
      }, []);

    const handleChange = event => {
        setSelectedValue(event.target.value);
    };

      
    async function solicitarMaterial (event: any) {
        setIsLoading(true)
        window.scrollTo(0, 0)
        try{
            const response = api.post('/form/material', {unidade: unidade, grupo: grupo, ie_padrao:padrao, ie_estoque:estocavel,setor:selectedValue,e_mail:email,nome_item:nomeitem,info:info})
            console.log((await response).data)
            setIsLoading(false);

            toast.success('Material solicitado com sucesso!')
        }
        catch{
            setIsLoading(false);

        }
    }

    return(
        <ContainerForm>
            {isLoading && <Loader />}
            <Imagem>
                <Hospital>
                </Hospital>
                <Logo>
                    <img src="..\src\Images\logo_horizontal.png" alt="" width={150}/>
                </Logo>
            </Imagem>
            <CardForm>
                <div className="meio">
                    <form onSubmit={handleSubmit(solicitarMaterial)}>
                        <Top>
                            <div className="titulo" id="titulo">
                                <h2>Cadastro de material</h2>
                            </div>
                            <Solicitante>
                                <p>E-mail solicitante: <b>*</b></p>
                                <input type="text" placeholder="Ex: cadastro@saocamilofortaleza.org.br" value={email} onChange={e => setEmail(e.target.value)}/>
                                <Aviso>
                                    <p>Os códigos cadastrados serão enviados para este e-mail!</p>
                                </Aviso>
                            </Solicitante>
                        </Top>
                        <NmItem>
                            <p>Qual o seu setor? <b>*</b></p>
                            <select value={selectedValue} onChange={handleChange}>
                                {opcoes.map(option => (
                                    <option key={option.nr_sequencia} value={option.nr_sequencia} >
                                    {option.ds_localizacao}
                                    </option>
                                ))}
                            </select>
                        </NmItem>
                        <NmItem>
                            <p>Descrição - Nome do item: <b>*</b></p>
                            <input type="text" placeholder="Sua resposta"  value={nomeitem} onChange={e => setNomeitem(e.target.value)}/>
                        </NmItem>
                        <NmItem>
                            <p>Unidade de medida <b>*</b></p>
                            <select value={unidade} onChange={e => setUnidade(e.target.value)}>
                                {opcoesMedida.map(opcao => (
                                    <option value={opcao}>{opcao}</option>
                                ))}
                            </select>
                        </NmItem>
                        <NmItem>
                            <p>Grupo do material: <b>*</b></p>
                            <select value={grupo} onChange={e => setGrupo(e.target.value)}>
                                {opcoesGrupo.map(opcao => (
                                    <option value={opcao}>{opcao}</option>
                                ))}
                            </select>
                        </NmItem>
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
                            <input type="text" placeholder="Alguma observação" value={info} onChange={e => setInfo(e.target.value)} />
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