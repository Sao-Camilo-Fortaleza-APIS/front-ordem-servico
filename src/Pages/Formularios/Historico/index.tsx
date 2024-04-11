import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Label } from "../../../components/Label";
import { Loader } from "../../../components/Load";
import { Content, Dialog, Trigger } from "../../../components/Modal";
import { Fieldset } from "../../../components/Modal/styles";
import SearchForm from "../../../components/SearchForm";

import { Search } from "lucide-react";
import { toast } from "react-toastify";
import { Btns } from "../../../styles/RegisterServiceOrder.styles";
import { Container, ContainerChat, ContainerHeader, ContainerMessages, Form, HeaderOrder, Message } from "./styles"; // Importação dos estilos

import { convertDate } from "../../../utils/convert-date";
import { configToastError, configToastSuccess } from "../../../utils/toast-config";

import EmptyHistory from '/assets/location_search.svg';

import { Editor } from "../../../components/Editor";
import { Header } from "../../../components/Header";
import { Navbar } from "../../../components/Navbar";
import { useSearch } from "../../../contexts/SearchContext";
import api from "../../../services/api";

export interface ResultOrderDataProps { // Cabeçalho: Essa interface é o tipo dos dados que a API retorna.
  number: number
  requester: string
  title: string
  stage: string;
}

export interface ResultHistoryDataProps { // Históricos: Essa interface é o tipo dos dados que a API retorna
  date: string
  user: string
  history: string
}

export function Historico() {
  const {
    resultOrderData,
    setResultOrderData,
    resultHistoryData,
    setResultHistoryData,
    open,
    setOpen,
    isLoading,
    setIsLoading,
    setOrderNumber,
    orderNumber
  } = useSearch()

  const divRef = useRef<HTMLDivElement>(null);

  const [openFormReply, setOpenFormReply] = useState<boolean>(false);
  const [openPreApprove, setOpenPreApprove] = useState<boolean>(false);
  const [replyHistory, setReplyHistory] = useState<string>('')
  const [userReplyHistory, setUserReplyHistory] = useState<string>('')
  const [userApprobation, setUserApprobation] = useState<string>('')

  async function handleSearch(orderNumber: number, event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setOrderNumber('')
    setOpen(false);
    setIsLoading(true);

    await api // await é o método que espera a resposta da API
      .get(`/get/hist_ordem/${orderNumber}`) // .get é o método que faz a requisição para a API
      .then(response => {
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
        setIsLoading(false)
      }) // .catch é o método que recebe o erro da API e faz alguma coisa com ele

  }

  async function handleReplyHistory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true)

    if (userReplyHistory === '') {
      toast.error('Preencha o campo Usuário Tasy', configToastError)
      setIsLoading(false)
      return
    }
    if (replyHistory === '') {
      toast.error('Preencha o campo de resposta ao formulário', configToastError)
      setIsLoading(false)
      return
    }

    await api.post('/post/history', {
      nr_order: resultOrderData?.number,
      nm_user: userReplyHistory,
      history: replyHistory
    }).then(response => {
      toast.success('Histórico respondido!', configToastSuccess)

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
      } else if (orderNumber === '') {
        toast.error('Pesquise uma Ordem de Serviço válida', configToastError)
      } else {
        toast.error('Não foi possível responder o histórico. Tente novamente mais tarde.', configToastError)
      }
      setIsLoading(false)
    })
  }

  async function handleApprobation(hasApprove: 'yes' | 'not', orderNumber: number) {

    if (hasApprove === 'not') {
      try {
        const response = await api.post('/post/approbation', { nr_order: `${orderNumber}`, has_approve: `${hasApprove}` })
        if (response?.status === 201) {
          setOpenFormReply(true)
          toast.success('Ordem de Serviço Reprovada!', configToastSuccess)
        }
        handleSearch(orderNumber)
      } catch (error) {
        toast.error('Houve um erro inesperado. Tente novamente mais tarde.', configToastError)
      }
    } else if (hasApprove === 'yes') {
      try {
        const response = await api.post('/post/approbation', {
          nr_order: `${orderNumber}`,
          has_approve: `${hasApprove}`,
          nm_usuario: `${userApprobation}`
        })
        if (response?.status == 201) {
          setOpenPreApprove(false)
          setUserApprobation('')
          toast.success('Ordem de Serviço Aprovada!', configToastSuccess)
        }
        handleSearch(orderNumber)
      } catch (error: AxiosError<Error> | any) {
        if (error?.response?.status === 400) {
          toast.error('Informe o Usuário do Tasy. Exemplo: nome.sobrenome', configToastError)
        } else if (error?.response?.status === 404) {
          toast.error('Usuário não encontrado. Tente novamente.', configToastError)
        } else {
          toast.error('Houve um erro inesperado. Tente novamente mais tarde.', configToastError)
        }
      }
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleApprobation('yes', resultOrderData?.number)
  }

  useEffect(() => {
    if (divRef.current) { // Se o divRef.current existir, ele vai fazer o scroll para o final do elemento
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [resultHistoryData])

  useEffect(() => {
    if (openFormReply === false) {
      setReplyHistory('');
      setUserReplyHistory('')
    }
  }, [openFormReply])

  return (
    <>
      {isLoading && <Loader />}
      <Header />
      <Navbar />
      <Container>
        <ContainerHeader>
          <h3>Histórico</h3>
          <div className="content-mobile">
            {resultOrderData && (
              <HeaderOrder>
                <div className="number-and-title">
                  <span>{resultOrderData?.number && `Nº ${resultOrderData?.number}`}</span>
                  <span>{resultOrderData?.title && `${resultOrderData?.title}`}</span>
                </div>

                <div className="requester">
                  <span>{resultOrderData?.requester}</span>
                </div>
              </HeaderOrder>
            )}
            <Dialog open={open} setOpen={setOpen}>
              <Content
                size="xl"
                title="Buscar"
                description="Pesquise o número da ordem de serviço para visualizar seus históricos."
              >
                <SearchForm />

              </Content>
              <Trigger asChild>
                <Button variant='search-icon'>
                  <Search size={24} color='white' />
                </Button>
              </Trigger>
            </Dialog>
          </div>
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
                return (
                  <Message key={index}>
                    <span>{history.user}</span>
                    <span dangerouslySetInnerHTML={{ __html: history.history }}></span>
                    <span>{convertDate(history.date)}</span>
                  </Message>
                )
              })
            )}
          </ContainerMessages>
          {resultOrderData?.stage === 'Aguardando Validação' ? (
            <>
              <Btns>
                <button
                  className="check"
                  onClick={() => setOpenPreApprove(true)}
                >
                  Aprovar
                </button>

                <button
                  className="danger"
                  onClick={() => handleApprobation('not', resultOrderData?.number)}
                >
                  Reprovar
                </button>
              </Btns>
              {/* DIALOG APPROVE */}
              <Dialog open={openPreApprove} setOpen={setOpenPreApprove}>
                <Content
                  size="sm"
                  title="Deseja aprovar?"
                >
                  <Form onSubmit={handleSubmit}>
                    <Label htmlFor="user-approbation">Usuário do Tasy</Label>
                    <Input
                      name="user-approbation"
                      type="text"
                      placeholder="Ex: nome.sobrenome"
                      required
                      value={userApprobation}
                      onChange={event => setUserApprobation(event.target.value)}
                    />
                    <Fieldset>
                      <Button onClick={() => setOpenPreApprove(false)}>Cancelar</Button>
                      <Button variant="reply" type="submit">Sim</Button>
                    </Fieldset>
                  </Form>

                </Content>
                <Trigger asChild>
                  <Button variant='search-icon'>
                    <Search size={24} color='white' />
                  </Button>
                </Trigger>
              </Dialog>
            </>
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
                      <Editor
                        name="history-reply"
                        value={replyHistory}
                        placeholder="Digite uma resposta a esse histórico"
                        onChange={event => setReplyHistory(event.currentTarget.innerHTML)}
                      />
                    </div>
                    <div className="action-form">
                      <Button type="submit" variant="reply">Enviar</Button>
                    </div>
                  </Form>
                </Content>
                {!resultOrderData?.number !== undefined ? (
                  <Trigger asChild>
                    <Btns>
                      <button disabled={resultOrderData?.number === undefined ? true : false} className="enviar">Responder</button>
                    </Btns>
                  </Trigger>
                ) : null}

              </Dialog>
            )
          )}

        </ContainerChat>
      </Container >
    </>
  )
}
