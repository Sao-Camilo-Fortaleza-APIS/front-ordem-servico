import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";

import { Dialog, Trigger, Content } from "../../../components/Modal";
import { Loader } from "../../../components/Load";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Label } from "../../../components/Label";
import SearchForm from "../../../components/SearchForm";
import { Fieldset } from "../../../components/Modal/styles";

import { Container, ContainerChat, ContainerHeader, ContainerMessages, Form, HeaderOrder, Message, Textarea } from "./styles"; // Importação dos estilos
import { Btns } from "../../../routes/RegisterServiceOrder.styles";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

import { removeHTML } from '../../../utils/remove-html'
import { convertDate } from "../../../utils/convert-date";
import { configToastSuccess, configToastError } from "../../../utils/toast-config";

import EmptyHistory from '../../../Images/location_search.svg'

import api from "../../../services/api";

interface ResultOrderDataProps { // Cabeçalho: Essa interface é o tipo dos dados que a API retorna.
  number: number
  requester: string
  title: string
  stage: string;
}

interface ResultHistoryDataProps { // Históricos: Essa interface é o tipo dos dados que a API retorna
  date: string
  user: string
  history: string
}

type ReplyHistoryDataProps = Pick<ResultOrderDataProps, "number"> & {
  user: string;
  reply: string;
}


export function Historico() {
  const divRef = useRef<HTMLDivElement>(null);

  const [orderNumber, setOrderNumber] = useState<string>('') // orderNumber é o estado que guarda o valor do input de número da ordem
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(true);
  const [openFormReply, setOpenFormReply] = useState(false);

  /**
   * resultOrderData é o estado que guarda os dados da ordem pesquisada, 
   * aqui ele é inicializado como um objeto vazio do tipo ResultOrderDataProps
  */
  const [resultHistoryData, setResultHistoryData] = useState<ResultHistoryDataProps[]>([] as ResultHistoryDataProps[])
  const [resultOrderData, setResultOrderData] = useState<ResultOrderDataProps>({} as ResultOrderDataProps)
  const [replyHistory, setReplyHistory] = useState<string>('')
  const [userReplyHistory, setUserReplyHistory] = useState<string>('')

  async function handleSearch(orderNumber: number, event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setOrderNumber('')
    setOpen(false);
    setIsLoading(true);

    await api // await é o método que espera a resposta da API
      .get(`/get/hist_ordem/${orderNumber}`) // .get é o método que faz a requisição para a API
      .then(response => {
        console.log(response.data.order)
        setResultHistoryData(response.data.history) // setResultHistoryData é o método que guarda os dados da ordem pesquisada no estado resultHistoryData
        setResultOrderData(response.data.order) // setResultHistoryData é o método que guarda os dados da ordem pesquisada no estado resultHistoryData
        setIsLoading(false)
      }) // .then é o método que recebe a resposta da API e faz alguma coisa com ela
      .catch((error: AxiosError) => {
        setResultHistoryData([]) // caso o número da ordem não seja encontrado, o estado resultHistoryData é zerado
        setResultOrderData({} as ResultOrderDataProps) // caso o número da ordem não seja encontrado, o estado resultOrderData é zerado
        if (error?.code === 'ERR_NETWORK') {
          toast.error('Houve um problema de rede. Tente novamente mais tarde.', configToastError)
        } else {
          toast.error('Número de ordem não encontrado, tente novamente.', configToastError)
        }
        console.error(error)
        setIsLoading(false)
      }) // .catch é o método que recebe o erro da API e faz alguma coisa com ele

  }

  async function handleReplyHistory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true)
    console.log(resultOrderData?.number, userReplyHistory, replyHistory);
    await api.post('/post/history', {
      nr_order: resultOrderData?.number,
      nm_user: userReplyHistory,
      history: replyHistory
    }).then(response => {
      toast.success('Histórico respondido!', configToastSuccess)
      console.log(response.data)
      setReplyHistory('')
      setUserReplyHistory('')
      setOpenFormReply(false)
      handleSearch(resultOrderData?.number, event)
      setIsLoading(false)
    }).catch((error: AxiosError) => {
      if (error.response?.status === 404) {
        toast.error(`${error?.response?.data}`, configToastError)
      } else if (error?.code === 'ERR_NETWORK') {
        toast.error('Houve um problema de rede. Tente novamente mais tarde.', configToastError)
      } else {
        toast.error('Não foi possível responder o histórico. Tente novamente mais tarde.', configToastError)
      }
      console.error(error)
      setIsLoading(false)
    })
  }

  async function handleApprobation(hasApprove: 'yes' | 'not', orderNumber: number) {
    console.info('Aprovou?', hasApprove, '; Nº Ordem:', orderNumber)
    await api.post('/post/approbation', {
      nr_order: orderNumber,
      has_approve: hasApprove,
    }).then(response => {
      console.log(response.status, response.data);
      if (response.status === 201) {
        if (response.data === 'Ordem de Serviço Aprovada!') {
          toast.success('Ordem de Serviço Aprovada!', configToastSuccess)
        } else if (response.data === 'Ordem de Serviço Reprovada!') {
          toast.success('Ordem de Serviço Reprovada!', configToastSuccess)
        }
      }

      handleSearch(orderNumber)
    }).catch((error: AxiosError) => {
      toast.error('Não foi possível aprovar a ordem de serviço. Tente novamente mais tarde.', configToastError)
    })
  }

  useEffect(() => {
    if (divRef.current) { // Se o divRef.current existir, ele vai fazer o scroll para o final do elemento
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [resultHistoryData])

  return (
    <>
      {isLoading && <Loader />}

      <Container>

        <ContainerHeader>
          <h3>Histórico</h3>
          {resultOrderData && (
            <HeaderOrder>
              <div className="number-and-title">
                <strong>{resultOrderData?.number} - </strong>
                <span>{resultOrderData?.title}</span>
              </div>

              <div className="requester">
                <span>{resultOrderData?.requester}</span>
              </div>
            </HeaderOrder>
          )}
          <Dialog open={open} setOpen={setOpen}>
            <Content
              size="lg"
              title="Buscar"
              description="Pesquise o número da ordem de serviço para visualizar seus históricos."
            >
              <SearchForm />


              <form onSubmit={(event) => handleSearch(Number(orderNumber), event)}>
                <Label htmlFor="order">Número da Ordem de Serviço</Label>
                <Fieldset>
                  <Input
                    required
                    id="order"
                    variant="search"
                    name="order"
                    type="number"
                    min={1}
                    value={orderNumber}
                    onChange={event => setOrderNumber(event.target.value)}
                    placeholder="Número da ordem"
                  />
                  <Button type="submit" variant="search">
                    <Search size="20" color="#71717a" />
                  </Button>
                </Fieldset>
              </form>
            </Content>
            <Trigger asChild>
              <Button variant='search-icon'>
                <Search size={24} color='white' />
              </Button>
            </Trigger>
          </Dialog>
        </ContainerHeader>

        <ContainerChat>
          <ContainerMessages ref={divRef}>
            {resultHistoryData.length === 0 ? (
              <div className="div-image">
                <img className="image" src={EmptyHistory} alt="Não há histórico" />
                <span>Pesquise o número da ordem de serviço para visualizar seus históricos...</span>
              </div>
            ) : (
              resultHistoryData.map((history, index) => {
                /**
                 * Se o tamanho do array for maior que 3 e o index for maior/igual que o tamanho do array -3 (limite de mensagens), 
                 * ele renderizará somente os 3 primeiros elementos do array
                 */
                if (resultHistoryData.length > 3 && index >= resultHistoryData.length - 3) {
                  //if (index = resultHistoryData.length - 3) { // No terceiro elemento do array, ele renderiza o botão de ver mais
                  return (
                    <Message key={index}>
                      <span>{history.user}</span>
                      <span>{removeHTML(history.history)}</span>
                      <span>{convertDate(history.date)}</span>
                    </Message>
                  )
                  //}
                } else {
                  return (
                    <Message key={index}>
                      <span>{history.user}</span>
                      <span>{removeHTML(history.history)}</span>
                      <span>{convertDate(history.date)}</span>
                    </Message>
                  )
                }
              })
            )}
          </ContainerMessages>
          {resultOrderData?.stage === 'Aguardando Validação' ? (
            <Btns>
              <button
                id="check"
                onClick={() => handleApprobation('yes', resultOrderData?.number)}
              >
                Aprovar
              </button>
              <button
                id="danger"
                onClick={() => handleApprobation('not', resultOrderData?.number)}
              >
                Reprovar
              </button>
            </Btns>
          ) : (
            resultOrderData?.stage !== 'Encerrado' && (
              <Dialog open={openFormReply} setOpen={setOpenFormReply}>
                <Content
                  position="right"
                  title="Responder Histórico"
                  size="sm"
                  overlay={false}
                  isInteractiveOutside={false}
                >
                  <Form className="reply" onSubmit={handleReplyHistory} style={{ width: '100%' }}>
                    <div>
                      <Label htmlFor="user-reply">Usuário Tasy</Label>
                      <Input
                        name="user-reply"
                        required
                        value={userReplyHistory}
                        onChange={event => setUserReplyHistory(event.target.value)}
                        type="text"
                        placeholder="Ex: nome.sobrenome"
                      />
                    </div>
                    <div>
                      <Label htmlFor="history-reply">Texto de resposta</Label>
                      <Textarea
                        required
                        name="history-reply"
                        value={replyHistory}
                        onChange={event => setReplyHistory(event.target.value)}
                        placeholder="Digite uma resposta a esse histórico" cols={15} rows={2}
                      />
                    </div>
                    <div className="action-form">
                      <Button type="submit" variant="reply">Enviar</Button>
                    </div>
                  </Form>
                </Content>
                <Trigger asChild>
                  <Btns>
                    <button id="enviar">Responder</button>
                  </Btns>
                </Trigger>
              </Dialog>
            )
          )}

        </ContainerChat>
      </Container >
    </>
  )
}
