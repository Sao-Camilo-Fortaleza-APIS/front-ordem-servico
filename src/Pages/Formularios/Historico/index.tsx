import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Label } from "../../../components/Label";
import { Loader } from "../../../components/Load";
import { Content, Dialog, Trigger } from "../../../components/Modal";
import { Fieldset } from "../../../components/Modal/styles";
import { Btns } from "../../../styles/RegisterServiceOrder.styles";
import { convertDate } from "../../../utils/convert-date";
import { configToastError, configToastSuccess } from "../../../utils/toast-config";
import { Container, ContainerChat, ContainerHeader, ContainerMessages, Form, Message } from "./styles"; // Importação dos estilos

import { AccordionOrderHeader } from "../../../components/AccordionHeader";
import { Editor } from "../../../components/Editor";
import { Header } from "../../../components/Header";
import { MoreActionsMenu } from "../../../components/MoreActions";
import SearchFormDialog from "../../../components/SearchForm";
import { SatisfactionOption, StarRating } from "../../../components/StartRating";
import { EmptyHistory } from "../../../components/SVGComponents/empty-history";
import { useSearch } from "../../../contexts/SearchContext";
import { useApprobation } from "../../../hooks/useApprobation";
import { fetchSatisfactionDegrees } from "../../../hooks/useDegreeSatisfaction";
import { useSearchOrder } from "../../../hooks/useSearchOrder";
import api from "../../../services/api";

export interface ResultOrderDataProps { // Cabeçalho: Essa interface é o tipo dos dados que a API retorna.
  number: number
  requester: string
  title: string
  stage: string;
  nr_stage: number;
  contact?: string
  damage: string
  date_order: string
  dt_fim_desejado: string
  dt_inicio_previsto: string
  location: string
  group: number
  group_planej: number
  describe: string
  awaiting_validate: string
  executor: string
  qtd_historico: number,
  dt_last_hist_solution: string
}

export interface ResultHistoryDataProps { // Históricos: Essa interface é o tipo dos dados que a API retorna
  date: string
  user: string
  history: string
  type: string
}

export function Historico() {
  const {
    resultOrderData,
    resultHistoryData,
    open,
    setOpen,
    isLoading,
    setIsLoading,
    setOrderNumber,
    orderNumber
  } = useSearch()
  const { searchOrder } = useSearchOrder()

  const divRef = useRef<HTMLDivElement>(null);

  const [openFormReply, setOpenFormReply] = useState<boolean>(false);
  const [openPreApprove, setOpenPreApprove] = useState<boolean>(false);
  const [replyHistory, setReplyHistory] = useState<string>('')
  const [userReplyHistory, setUserReplyHistory] = useState<string>('')
  const [userApprobation, setUserApprobation] = useState<string>('')
  const [satisfactionDegrees, setSatisfactionDegrees] = useState<SatisfactionOption[]>([])
  const [satisfactionSelected, setSatisfactionSelected] = useState<string>('')

  async function handleSearch(orderNumber: number, event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    await searchOrder(orderNumber, {
      setIsLoading,
      resetOrderNumber: () => setOrderNumber(''),
      closeModal: () => setOpen(false),
    })
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

    await api.post('/post/history/return', {
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

  const { handleApprobation } = useApprobation({
    userApprobation,
    satisfactionSelected,
    setOpenFormReply,
    setOpenPreApprove,
    setUserApprobation,
    handleSearch
  })

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
    fetchSatisfactionDegrees().then((response) => setSatisfactionDegrees(response)).catch(() => setSatisfactionDegrees([]))

    if (openFormReply === false) {
      setReplyHistory('');
      setUserReplyHistory('')
      return
    }
  }, [openFormReply])

  return (
    <>
      {isLoading && <Loader />}
      <Header />
      <Container>
        <ContainerHeader>
          <h3>Histórico</h3>
          <div className="content-mobile">
            <AccordionOrderHeader />
            <SearchFormDialog open={open} setOpen={setOpen} />
          </div>
        </ContainerHeader>

        <ContainerChat>
          <ContainerMessages ref={divRef}>
            {resultHistoryData.length === 0 ? (
              <div className="div-image">
                <EmptyHistory className="image" />
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
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1rem',
                padding: ' 0.75rem 0.5rem 1rem',
                backgroundColor: '#ffffff',
                borderRadius: '0 0 0.75rem 0.75rem',
                alignItems: 'stretch',
              }}>
              <Btns style={{ width: '100%' }}>
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
              <MoreActionsMenu
                numberOrder={resultOrderData?.number}
                showUpload={true}
                disabled={resultOrderData?.number === undefined ? true : false}
                style={{ width: '62px' }}
                colorScheme="red"
              />
              {/* DIALOG APPROVE */}
              <Dialog open={openPreApprove} setOpen={setOpenPreApprove}>
                <Content
                  size="md"
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

                    <Label htmlFor="rating">Como foi sua experiência?</Label>
                    <StarRating
                      options={satisfactionDegrees}
                      onRatingChange={(value) => setSatisfactionSelected(value)}
                    />

                    <Fieldset>
                      <Button onClick={() => setOpenPreApprove(false)}>Cancelar</Button>
                      <Button variant="reply" type="submit">Sim</Button>
                    </Fieldset>
                  </Form>

                </Content>
              </Dialog>
            </div>
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
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    padding: ' 0.75rem 0.5rem 1rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '0 0 0.75rem 0.75rem',
                    alignItems: 'stretch',
                  }}>
                  <Trigger asChild>
                    <Btns style={{ width: '100%' }}>
                      <button
                        disabled={resultOrderData?.number === undefined ? true : false}
                        title="Responder Ordem de Serviço"
                        className="enviar"
                      >
                        Responder
                      </button>
                    </Btns>
                  </Trigger>

                  <MoreActionsMenu
                    numberOrder={resultOrderData?.number}
                    showUpload={true}
                    disabled={resultOrderData?.number === undefined ? true : false}
                    style={{ width: '62px' }}
                    colorScheme="red"
                  />
                </div>
              </Dialog>
            )
          )}

          {resultOrderData?.stage === 'Encerrado' && (
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1rem',
                padding: ' 0.75rem 0.5rem 1rem',
                backgroundColor: '#ffffff',
                borderRadius: '0 0 0.75rem 0.75rem',
                alignItems: 'stretch',
              }}>
              <Btns style={{ width: '100%' }}>
                <button
                  disabled={resultOrderData?.stage === 'Encerrado' ? true : false}
                  title="Essa Ordem já está encerrada"
                  className="enviar"
                >
                  Essa Ordem já está encerrada
                </button>
              </Btns>

              <MoreActionsMenu
                numberOrder={resultOrderData?.number}
                showUpload={true}
                disabled={resultOrderData?.number === undefined ? true : false}
                style={{ width: '62px' }}
                colorScheme="red"
              />
            </div>
          )}

        </ContainerChat>
      </Container >
    </>
  )
}
