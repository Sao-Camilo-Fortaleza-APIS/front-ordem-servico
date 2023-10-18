import { useState } from "react";

import { Modal } from "../../../components/Modal";
import { Button, Flex, Input } from "../../../components/Modal/styles";
import * as Dialog from "@radix-ui/react-dialog";

import { Container, ContainerChat, ContainerMessages, Message } from "./styles"; // Importação dos estilos

import { Loader } from "../../../components/Load";

import { removeHTML } from '../../../utils/remove-html'

import EmptyHistory from '../../../Images/location_search.svg'

import api from "../../../services/api";
import { convertDate } from "../../../utils/convert-date";

interface ResultOrderDataProps { // Essa interface é o tipo dos dados que a API retorna
  order: number
  requester: string
  title: string
}

interface ResultHistoryDataProps { // Essa interface é o tipo dos dados que a API retorna
  date: string
  user: string
  history: string
}


export function Historico() {
  const [orderNumber, setOrderNumber] = useState<string>('') // orderNumber é o estado que guarda o valor do input de número da ordem
  const [isLoading, setIsLoading] = useState(false)

  /**
   * resultOrderData é o estado que guarda os dados da ordem pesquisada, 
   * aqui ele é inicializado como um objeto vazio do tipo ResultOrderDataProps
  */
  const [resultHistoryData, setResultHistoryData] = useState<ResultHistoryDataProps[]>([])

  const [open, setOpen] = useState(true);

  async function handleSearch() {
    setIsLoading(true)

    await api // await é o método que espera a resposta da API
      .get(`/get/hist_ordem/${orderNumber}`) // .get é o método que faz a requisição para a API
      .then(response => {
        console.log(response.data.history)
        setResultHistoryData(response.data.history) // setResultHistoryData é o método que guarda os dados da ordem pesquisada no estado resultHistoryData
        setOrderNumber('')
        setIsLoading(false)
      }) // .then é o método que recebe a resposta da API e faz alguma coisa com ela
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      }) // .catch é o método que recebe o erro da API e faz alguma coisa com ele

  }

  return (
    <>
      {isLoading && <Loader />}

      <Container>
        <ContainerChat>

          <h2>Histórico</h2>

          <ContainerMessages>
            <Modal open={open} setOpen={setOpen}>
              <Input
                required
                id="order"
                name="order"
                type="number"
                value={orderNumber}
                onChange={event => setOrderNumber(event.target.value)}
              />
              <Flex>
                <Dialog.Close asChild>
                  {orderNumber.length > 0 && (
                    <Button
                      type="submit"
                      variant="search"
                      onClick={handleSearch}
                      disabled={!orderNumber && true}
                    >
                      Pesquisar
                    </Button>
                  )}
                </Dialog.Close>
              </Flex>
            </Modal>

            {resultHistoryData.length === 0 ? (
              <div className="div-image">
                <img className="image" src={EmptyHistory} alt="Não há histórico" />
              </div>
            ) : (
              resultHistoryData.map((history, index) => {
                return (
                  <Message key={index}>
                    <span>{history.user}</span>
                    <span>{removeHTML(history.history)}</span>
                    <span>{convertDate(history.date)}</span>
                  </Message>
                )
              })
            )}


          </ContainerMessages>
        </ContainerChat>
      </Container>
    </>
  )
}
