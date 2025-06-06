import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../components/Header";
import { Loader } from "../components/Load";
import { OrderPendingData, PendingValidationModal } from "../components/PendingValidationModal";
import { Equipamento, Tabs } from "../components/Tabs";
import api from "../services/api";
import { Btns, CardForm, DivItems, NmItem } from "../styles/RegisterServiceOrder.styles";
import { configToastError } from "../utils/toast-config";

export function RegisterServiceOrder() {
  const [equipamento, setEquipamento] = useState<Equipamento | null>(null);

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
  const [servicos, setServicos] = useState<Equipamento[] | null>(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [hasPendingOrders, setHasPendingOrders] = useState<boolean>(false)
  const [pendingOrdersPendingValidation, setPendingOrdersWaitingValidation] = useState<OrderPendingData[]>([])
  const [isLoadingUser, setIsLoadingUser] = useState(false)
  let dt_inicio_desejado = new Date()

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
        setServicos(response.data.sort((a: any, b: any) => a.ds_equip.localeCompare(b.ds_equip, 'pt-BR', { sensitivity: 'base' })));
      })
      .catch(error => {
        // console.log(error);
        toast.error('Não foi possível carregar os equipamentos.', configToastError)
      });
  }

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const handleSelect = (equip: Equipamento | null) => {
    setEquipamento(equip || null);
  };

  async function registrarEvento(event: any) {
    if (parado === '' || selectedValue === '' || equipamento === null) {
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
          nr_seq_equipamento: `${equipamento?.cd_equip}`,
          nr_grupo_planej: `${equipamento?.grupo_planej}`,
          nr_grupo_trabalho: `${equipamento?.cd_group_trab}`
        })
        const nr_seq_os = response.data
        setIsLoading(false)
        toast.success('Ordem de serviço aberta com sucesso!')
        navigate(`/ajuste/success/${nr_seq_os}`, { state: userMaiusculo })
      }
      catch (status: any) {
        setIsLoading(false);
        const erro = status.request.status
        const request = status.request.response
        toast.error(request)
      }
    }

  }

  async function fetchOrdersPendingValidation() {
    if (!userMaiusculo) return

    setIsLoadingUser(true)
    await api.get(`get/orders/requester/${userMaiusculo}?filter=awaiting`)
      .then((response) => {
        setPendingOrdersWaitingValidation(response.data)
        if (response.data.length > 0) {
          setTimeout(() => {
            setHasPendingOrders(true)
          }, 500)
        }
      })
      .catch((error) => {
        if (error.response.status === 404) { console.log("Usuário não encontrado") }
      })
      .finally(() => { setIsLoadingUser(false) })

  }

  useEffect(() => {
    fetchSetor();
    fetchEquipamento();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <Header />
      <CardForm>
        <div className="meio">
          <form onSubmit={handleSubmit(registrarEvento)}>
            <DivItems>
              {/* USUÁRIO */}
              <NmItem>
                <p>Qual o seu usuário do  <span>Tasy</span> ? </p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    required
                    {...register("nm_usuario")}
                    placeholder="Seu usuário do Tasy"
                    value={nm_usuario}
                    onChange={e => setNm_usuario(e.target.value)}
                    onBlur={fetchOrdersPendingValidation}
                  />
                  {isLoadingUser && <Loader2 className="animate-spin" color="red" />}
                </div>
              </NmItem>

              {/* RAMAL */}
              <NmItem>
                <p>Qual seu ramal de contato?</p>
                <input
                  required
                  type="number"
                  placeholder="Seu Ramal"
                  {...register("ramal")}
                  value={ramal}
                  onChange={e => setRamal(e.target.value)}
                />
              </NmItem>
            </DivItems>
            {/* MOSTRAR MODAL DE ORDENS PENDENTES DE VALIDAÇÃO */}
            <PendingValidationModal
              open={hasPendingOrders}
              onOpenChange={setHasPendingOrders}
              data={pendingOrdersPendingValidation}
              requester={userMaiusculo}
            />

            {/* SETOR */}
            <NmItem>
              <p>Qual o seu <span>setor</span>? </p>
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

            {/* INDISPONIBILIDADE */}
            <NmItem>
              <p>Quem está sendo impactado?</p>
              <div className="div" id="valores">

                <label htmlFor="apenas-eu">
                  <input type="radio" id="apenas-eu" value='N' checked={parado == 'N'} onChange={e => setParado(e.target.value)} />
                  Apenas eu
                </label>

                <label htmlFor="algumas-pessoas">
                  <input type="radio" id="algumas-pessoas" value='P' checked={parado == 'P'} onChange={e => setParado(e.target.value)} />
                  Algumas pessoas
                </label>

                <label htmlFor="todo-setor">
                  <input type="radio" id="todo-setor" value='S' checked={parado == 'S'} onChange={e => setParado(e.target.value)} />
                  Todo o setor
                </label>

              </div>
            </NmItem>


            {/* TÍTULO */}
            <NmItem>
              <p><span>Título</span> para a sua solicitação: </p>
              <input name="titulo_order" required maxLength={80} type="text" placeholder="Digite um título para sua Ordem de Serviço" value={ajuste} onChange={e => setAjuste(e.target.value)} />
            </NmItem>

            {/* DETALHES */}
            <NmItem>
              <p>Descreva melhor a sua solicitação. Como podemos ajudar? </p>
              <textarea
                name="datalhes_defeito"
                required
                placeholder="Adicione uma descrição para sua Ordem de Serviço"
                value={obs}
                onChange={e => setObs(e.target.value)}
              />
            </NmItem>

            <Btns>
              <button style={{ marginTop: '0.625rem', marginBottom: '2rem' }} className="enviar" type="submit">Enviar</button>
            </Btns>
          </form>
        </div>
      </CardForm>
    </>
  )
}