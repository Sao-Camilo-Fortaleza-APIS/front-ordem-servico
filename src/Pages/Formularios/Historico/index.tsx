import { useEffect, useRef, useState } from "react";

import { Modal } from "../../../components/Modal";
import { Loader } from "../../../components/Load";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Label } from "../../../components/Label";

import { Container, ContainerButton, ContainerChat, ContainerHeader, ContainerMessages, HeaderOrder, Message } from "./styles"; // Importação dos estilos

import { removeHTML } from '../../../utils/remove-html'
import { convertDate } from "../../../utils/convert-date";

import EmptyHistory from '../../../Images/location_search.svg'
import { Search } from "lucide-react";

import api from "../../../services/api";
import { Fieldset } from "../../../components/Modal/styles";
import { Btns } from "../../../routes/RegisterServiceOrder.styles";

interface ResultOrderDataProps { // Essa interface é o tipo dos dados que a API retorna
  number: number
  requester: string
  title: string
}

interface ResultHistoryDataProps { // Essa interface é o tipo dos dados que a API retorna
  date: string
  user: string
  history: string
}


export function Historico() {
  const divRef = useRef<HTMLDivElement>(null);

  const [orderNumber, setOrderNumber] = useState<string>('') // orderNumber é o estado que guarda o valor do input de número da ordem
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(true);

  /**
   * resultOrderData é o estado que guarda os dados da ordem pesquisada, 
   * aqui ele é inicializado como um objeto vazio do tipo ResultOrderDataProps
  */
  const [resultHistoryData, setResultHistoryData] = useState<ResultHistoryDataProps[]>([])
  const [resultOrderData, setResultOrderData] = useState<ResultOrderDataProps>()

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpen(false);
    setIsLoading(true);

    await api // await é o método que espera a resposta da API
      .get(`/get/hist_ordem/${orderNumber}`) // .get é o método que faz a requisição para a API
      .then(response => {
        console.log(response.data.order)
        setResultHistoryData(response.data.history) // setResultHistoryData é o método que guarda os dados da ordem pesquisada no estado resultHistoryData
        setResultOrderData(response.data.order) // setResultHistoryData é o método que guarda os dados da ordem pesquisada no estado resultHistoryData
        setOrderNumber('')
        setIsLoading(false)
      }) // .then é o método que recebe a resposta da API e faz alguma coisa com ela
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      }) // .catch é o método que recebe o erro da API e faz alguma coisa com ele

  }

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [])

  useEffect(() => {
    if (divRef.current) {
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
          <Modal open={open} setOpen={setOpen}>
            <form onSubmit={handleSearch}>
              <Label htmlFor="order">Número da Ordem de Serviço</Label>
              <Fieldset>
                <Input
                  required
                  id="order"
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
          </Modal>
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

          <Btns>
            <button id="enviar" type="submit">Responder</button>
            <button id="enviar" type="submit">Responder</button>
          </Btns>
        </ContainerChat>
      </Container>
    </>
  )
}
