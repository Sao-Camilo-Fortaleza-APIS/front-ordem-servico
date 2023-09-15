import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";
import { Aviso, Btns, CardForm, NmItem, NmItemNumero, Radios, Solicitante, InputContainer } from "./RegisterServiceOrder.styles";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Load";
import { toast } from "react-toastify";
//import { ContainerForm } from "../components/ContainerForm";


export function RegisterServiceOrdem() {
  // Opções dos select
  const opcoesEquipamento = [
    { "nome_equipamento": "", "valor": 0 },
    { "nome_equipamento": "Suporte Tasy", "valor": 202 },
    { "nome_equipamento": "Suporte TIC", "valor": 203 },
    { "nome_equipamento": "Manutenção Predial", "valor": 204 },
    //    {"nome_equipamento":"Manutenção de equipamentos Biomedicos", "valor":205},
    { "nome_equipamento": "Central de Cadastro", "valor": 206 },
  ];

  const opcoesSetor = [
    {
      "nr_sequencia": "0",
      "ds_localizacao": "Selecione uma localização"
    },
    {
      "nr_sequencia": "1",
      "ds_localizacao": "Sala de Emergência"
    },
    {
      "nr_sequencia": "2",
      "ds_localizacao": "Departamento de Cardiologia"
    },
    {
      "nr_sequencia": "3",
      "ds_localizacao": "Departamento de Radiologia"
    },
    {
      "nr_sequencia": "4",
      "ds_localizacao": "Enfermaria de Pediatria"
    },
    {
      "nr_sequencia": "5",
      "ds_localizacao": "Departamento de Cirurgia"
    },
    {
      "nr_sequencia": "6",
      "ds_localizacao": "Departamento de Oncologia"
    },
    {
      "nr_sequencia": "7",
      "ds_localizacao": "Enfermaria de Ortopedia"
    },
    {
      "nr_sequencia": "8",
      "ds_localizacao": "Departamento de Neurologia"
    },
    {
      "nr_sequencia": "9",
      "ds_localizacao": "Enfermaria de Maternidade"
    },
    {
      "nr_sequencia": "10",
      "ds_localizacao": "Unidade de Terapia Intensiva"
    },
    {
      "nr_sequencia": "11",
      "ds_localizacao": "Departamento de Psiquiatria"
    }
  ]

  const [equipamento, setEquipamento] = useState('')
  const handleEquip = (event: any) => {
    setEquipamento(event.target.value);
  };

  // Função para redirecionar a pagina
  const navigate = useNavigate();
  // Efeito Login
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [nm_usuario, setNm_usuario] = useState('') //userMaiusculo
  const [ajuste, setAjuste] = useState('') //textoFinal
  const [obs, setObs] = useState('')
  const [ramal, setRamal] = useState('')
  const [parado, setParado] = useState('')
  const [opcoes, setOpcoes] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');


  let ie_prioridade: any
  var options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  let dt_inicio_desejado = new Date()
  let grupoPlanejamento: any
  let grupoTrabalho: any

  // Tratando os dados
  // Tirando os espaços vazios e deixando o usuario em maiusculo 
  const usuarioTrim = nm_usuario.trim();
  const userMaiusculo = usuarioTrim.toUpperCase();


  useEffect(() => {
    async function fetchData() {
      await api.get('/get/setor')
        .then(response => {
          const optionsWithBlank: any = [{ id: "", name: "Selecione uma opção" }, ...response.data];
          setOpcoes(optionsWithBlank);
        })
        .catch(error => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
    if (equipamento === '205') {
      setEquipamento('202')
    }
  };



  async function registrarEvento(event: any) {
    if (parado === 'N') {
      ie_prioridade = 'M'
    } else if (parado === 'P') {
      ie_prioridade = 'A'
    } else if (parado === 'S') {
      ie_prioridade = 'U'
    }
    if (parado === 'S') {
      dt_inicio_desejado.setMinutes(dt_inicio_desejado.getMinutes() + 10);
    } else if (parado === 'P') {
      dt_inicio_desejado.setMinutes(dt_inicio_desejado.getMinutes() + 30);
    } else if (parado === 'N') {
      dt_inicio_desejado.setMinutes(dt_inicio_desejado.getMinutes() + 60);
    }
    if (equipamento === '202') {
      grupoPlanejamento = '28',
        grupoTrabalho = '27'
    } else if (equipamento === '203') {
      grupoPlanejamento = '28',
        grupoTrabalho = '28'
    } else if (equipamento === '204') {
      grupoPlanejamento = '26',
        grupoTrabalho = '17'
    } else if (equipamento === '205') {
      grupoPlanejamento = '31',
        grupoTrabalho = '31'
    } else if (equipamento === '206') {
      grupoPlanejamento = '28',
        grupoTrabalho = '23'
    }
    if (parado === '' || selectedValue === '' || equipamento === "") {
      toast.error("Preencha todos os campos!", {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
    else {
      setIsLoading(true)
      window.scrollTo(0, 0)
      try {
        const dataOficial = dt_inicio_desejado.toLocaleDateString('pt-BR', options)
        console.log({ user: userMaiusculo, ajuste: ajuste, obs: obs, ramal: ramal, parado: parado, prioridade: ie_prioridade, dt: dataOficial, slec: selectedValue, equipamento: equipamento, grupoPlanejamento: grupoPlanejamento, grupoTrabalho: grupoTrabalho })
        const response = await api.post('/form/ajuste', {
          nm_usuario: `${userMaiusculo}`,
          nr_contato: `${ramal}`,
          titulo_p: `${ajuste}`,
          descricao_p: `${obs}`,
          ie_parado: `${parado}`,
          dt_inicio_desejado: `${dataOficial}`,
          nr_seq_localizacao: `${selectedValue}`,
          nr_seq_equipamento: `${equipamento}`,
          nr_grupo_planej: `${grupoPlanejamento}`,
          nr_grupo_trabalho: `${grupoTrabalho}`
        })
        const nr_seq_os = response.data
        setIsLoading(false)
        toast.success('Ordem de serviço feita com sucesso!')
        navigate(`/ajuste/success/${nr_seq_os}`)
      }
      catch (status: any) {
        setIsLoading(false);
        const erro = status.request.status
        const request = status.request.response
        console.log('ERRO:', erro)
        toast.error(request)
      }
    }

  }
  return (
    <>

      {isLoading && <Loader />}

      <CardForm>
        <div className="meio">
          <form onSubmit={handleSubmit(registrarEvento)}>
            <InputContainer>
              <Solicitante>
                <p>Usuário Tasy do solicitante: <b>*</b></p>
                <input type="text" required {...register("nm_usuario")} placeholder="Seu usuário" value={nm_usuario} onChange={e => setNm_usuario(e.target.value)} />
              </Solicitante>
            </InputContainer>
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
              <p>Equipamento: <b>*</b></p>
              <select value={equipamento} onChange={handleEquip}>
                {opcoesEquipamento.map(option => (
                  <option key={option.nome_equipamento} value={option.valor} >
                    {option.nome_equipamento}
                  </option>
                ))}
              </select>
              <Aviso>
                <p>Neste campo informe qual equipe deverá de atender.</p>
              </Aviso>
            </NmItem>
            <NmItem >
              <p>Existe indisponibilidade? <b>*</b></p>
              <div className="div" id="valores">
                <div className="radio">
                  <input type="radio" name="Sim" value='S' checked={parado == 'S'} onChange={e => setParado(e.target.value)} />
                  <p>Sim</p>
                </div>
                <div className="radio">
                  <input type="radio" name="Não" value='N' checked={parado == 'N'} onChange={e => setParado(e.target.value)} />
                  <p>Não</p>
                </div>
                <div className="radio">
                  <input type="radio" name="Parcial" value='P' checked={parado == 'P'} onChange={e => setParado(e.target.value)} />
                  <p>Parcialmente</p>
                </div>
              </div>
              <Aviso>
                <p>Informe neste campo se o ajuste solicitado impacta no funcionamento do sistema / equipamento</p>
              </Aviso>
            </NmItem>
            <NmItem>
              <p>Título da ordem: <b>*</b></p>
              <input required maxLength={80} type="text" placeholder="Nome da solicitação" value={ajuste} onChange={e => setAjuste(e.target.value)} />
            </NmItem>
            <NmItem>
              <p>Detalhes do defeito: <b>*</b></p>
              <input required type="text" placeholder="Descreva o defeito, ajuste ou problema" value={obs} onChange={e => setObs(e.target.value)} />
            </NmItem>
            <NmItem>
              <p>N° Ramal:<b>*</b></p>
              <input required type="number" placeholder="Seu Ramal" {...register("ramal")} value={ramal} onChange={e => setRamal(e.target.value)} />
            </NmItem>
            <Btns>
              <button id="enviar" type="submit">Enviar</button>
            </Btns>
          </form>
        </div>
      </CardForm>

    </>
  )
}