import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../components/Header";
import { Loader } from "../components/Load";
import { Equipamento, Tabs } from "../components/Tabs";
import api from "../services/api";
import { Btns, CardForm, DivItems, NmItem } from "../styles/RegisterServiceOrder.styles";
import { configToastError } from "../utils/toast-config";

export function RegisterServiceOrder() {
  // Estado para o nome do equipamento
  const [equipamento, setEquipamento] = useState('')

  // Função para redirecionar a pagina
  const navigate = useNavigate();
  // Efeito Login
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [nm_usuario, setNm_usuario] = useState('') //userMaiusculo
  const [ajuste, setAjuste] = useState('') //textoFinal
  const [obs, setObs] = useState('')
  const [ramal, setRamal] = useState('')
  const [parado, setParado] = useState('N')
  const [opcoes, setOpcoes] = useState([]);
  const [servicos, setServicos] = useState<Equipamento | null>(null);
  const [selectedValue, setSelectedValue] = useState('');


  let ie_prioridade: any
  var options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  let dt_inicio_desejado = new Date()
  let grupoPlanejamento: any
  let grupoTrabalho: any
  let seqEquipamento: string

  // Tratando os dados
  // Tirando os espaços vazios e deixando o usuario em maiusculo 
  const usuarioTrim = nm_usuario.trim();
  const userMaiusculo = usuarioTrim.toUpperCase();

  async function fetchSetor() {
    await api.get('/get/setor')
      .then(response => {
        const optionsWithBlank: any = [{ id: "", name: "Selecione uma opção" }, ...response.data];
        setOpcoes(optionsWithBlank);
      })
      .catch(error => {
        // console.log(error);
        toast.error('Não foi possível carregar os setores.', configToastError)
      });
  }

  async function fetchEquipamento() {
    await api.get('/get/equipments')
      .then(response => {
        setServicos(response.data);
      })
      .catch(error => {
        // console.log(error);
        toast.error('Não foi possível carregar os equipamentos.', configToastError)
      });
  }

  useEffect(() => {
    fetchSetor();
    fetchEquipamento();
  }, []);

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const handleSelect = (equipamento: Equipamento | null) => {
    setServicos(equipamento);
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
    if (equipamento === "Suporte Tasy") {
      seqEquipamento = '202'
      grupoPlanejamento = '28',
        grupoTrabalho = '27'
    } else if (equipamento === "Suporte TIC") {
      seqEquipamento = '203'
      grupoPlanejamento = '28',
        grupoTrabalho = '28'
    } else if (equipamento === "Manutenção Predial") {
      seqEquipamento = '204'
      grupoPlanejamento = '26',
        grupoTrabalho = '17'
    } else if (equipamento === "Suporte de Impressoras") {
      seqEquipamento = '203'
      grupoPlanejamento = '28',
        grupoTrabalho = '26'
    } else if (equipamento === "Central de Cadastro") {
      seqEquipamento = '206'
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
        theme: "light"
      });
    }
    else {
      setIsLoading(true)
      window.scrollTo(0, 0)
      try {
        const dataOficial = dt_inicio_desejado.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
        // console.log({ user: userMaiusculo, ajuste: ajuste, obs: obs, ramal: ramal, parado: parado, prioridade: ie_prioridade, dt: dataOficial, slec: selectedValue, seqEquipamento: seqEquipamento, equipamento: equipamento, grupoPlanejamento: grupoPlanejamento, grupoTrabalho: grupoTrabalho })
        const response = await api.post('/form/ajuste', {
          nm_usuario: `${userMaiusculo}`,
          nr_contato: `${ramal}`,
          titulo_p: `${ajuste}`,
          descricao_p: `${obs}`,
          ie_parado: `${parado}`,
          dt_inicio_desejado: `${dataOficial}`,
          nr_seq_localizacao: `${selectedValue}`,
          nr_seq_equipamento: `${seqEquipamento}`,
          nr_grupo_planej: `${grupoPlanejamento}`,
          nr_grupo_trabalho: `${grupoTrabalho}`
        })
        const nr_seq_os = response.data
        setIsLoading(false)
        toast.success('Ordem de serviço aberta com sucesso!')
        navigate(`/ajuste/success/${nr_seq_os}`)
      }
      catch (status: any) {
        setIsLoading(false);
        const erro = status.request.status
        const request = status.request.response
        //console.log('ERRO:', erro)
        toast.error(request)
      }
    }

  }
  return (
    <>

      {isLoading && <Loader />}
      <Header />
      {/* <Navbar /> */}
      <CardForm>
        <div className="meio">
          <form onSubmit={handleSubmit(registrarEvento)}>
            {/* TÍTULO */}
            <NmItem>
              <p><span>Título</span> para a sua Ordem de Serviço: {/* <b>*</b> */}</p>
              <input name="titulo_order" required maxLength={80} type="text" placeholder="Digite um título para sua Ordem de Serviço" value={ajuste} onChange={e => setAjuste(e.target.value)} />
            </NmItem>

            {/* DETALHES */}
            <NmItem>
              <p>Descreva melhor solicitação seja ela um pedido, defeito ou dúvida. {/* <b>*</b> */}</p>
              <textarea
                name="datalhes_defeito"
                required
                placeholder="Adicione uma descrição para sua Ordem de Serviço"
                value={obs}
                onChange={e => setObs(e.target.value)}
              />
            </NmItem>

            <DivItems>
              {/* USUÁRIO */}
              <NmItem style={{ width: '100%' }}>
                <p>Usuário Tasy do solicitante: {/* <b>*</b> */}</p>
                <input type="text" required {...register("nm_usuario")} placeholder="Seu usuário do Tasy" value={nm_usuario} onChange={e => setNm_usuario(e.target.value)} />
              </NmItem>
              {/* RAMAL */}
              <NmItem style={{ width: '100%' }}>
                <p>N° Ramal:{/* <b>*</b> */}</p>
                <input required type="number" placeholder="Seu Ramal" {...register("ramal")} value={ramal} onChange={e => setRamal(e.target.value)} />
              </NmItem>
            </DivItems>

            {/* SETOR */}
            <NmItem>
              <p>Qual o seu setor? {/* <b>*</b> */}</p>
              <select value={selectedValue} onChange={handleChange}>
                {opcoes.map((option: {
                  nr_sequencia: string,
                  ds_localizacao: string
                }, index) => (
                  <option key={index} value={option.nr_sequencia} >
                    {option.ds_localizacao}
                  </option>
                ))}
              </select>
            </NmItem>

            {/* TABS */}
            <Tabs equipamentos={servicos} onSelect={handleSelect} />

            {/* EQUIPAMENTO */}
            {/* <NmItem>
              <p>Equipamento:</p>
              <select value={equipamento} onChange={event => setEquipamento(event.target.value)}>
                <option value="0"></option>
                <option value="Suporte Tasy">Suporte Tasy</option>
                <option value="Suporte TIC">Suporte TIC</option>
                <option value="Suporte de Impressoras">Suporte de Impressoras</option>
                <option value="Manutenção Predial">Manutenção Predial</option>
                <option value="Central de Cadastro">Central de Cadastro</option>
              </select>
              <Aviso>
                <p>Neste campo informe qual equipe deverá de atender.</p>
              </Aviso>
            </NmItem> */}

            {/* INDISPONIBILIDADE */}
            <NmItem >
              <p>Prioridade {/* <b>*</b> */}</p>{/* Você consegue realizar o seu processo de outra forma? */}
              <div className="div" id="valores">

                <label htmlFor="nao">
                  <input type="radio" id="nao" value='N' checked={parado == 'N'} onChange={e => setParado(e.target.value)} />
                  Não
                </label>

                <label htmlFor="sim">
                  <input type="radio" id="sim" value='S' checked={parado == 'S'} onChange={e => setParado(e.target.value)} />
                  Sim
                </label>

                <label htmlFor="parcial">
                  <input type="radio" id="parcial" value='P' checked={parado == 'P'} onChange={e => setParado(e.target.value)} />
                  Parcialmente
                </label>
              </div>
              {/* <Aviso>
                <p>Informe neste campo se o ajuste solicitado impacta no funcionamento do sistema / equipamento</p>
              </Aviso> */}
            </NmItem>

            <Btns>
              <button className="enviar" type="submit">Enviar</button>
            </Btns>
          </form>
        </div>
      </CardForm>

    </>
  )
}