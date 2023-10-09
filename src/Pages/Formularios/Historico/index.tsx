import { useState } from "react";
import { Label } from "../../../components/Label";
import { Input } from "../../../components/Input";

import { Container, ContainerButton, ContainerChat, ContainerMessages, Message } from "./styles"; // Importação dos estilos

import { Search } from "lucide-react"; // Importação dos ícones

import api from "../../../services/api";

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
  const [orderNumber, setOrderNumber] = useState<number>(0) // orderNumber é o estado que guarda o valor do input de número da ordem

  /**
   * resultOrderData é o estado que guarda os dados da ordem pesquisada, 
   * aqui ele é inicializado como um objeto vazio do tipo ResultOrderDataProps
   */
  const [resultHistoryData, setResultHistoryData] = useState<ResultHistoryDataProps[]>([])

  async function handleSearch() {
    console.log();

    await api // await é o método que espera a resposta da API
      .get(`/get/hist_ordem/${orderNumber}`) // .get é o método que faz a requisição para a API
      .then(response => {
        console.log(response.data.history)
        setResultHistoryData(response.data.history) // setResultHistoryData é o método que guarda os dados da ordem pesquisada no estado resultHistoryData
      }) // .then é o método que recebe a resposta da API e faz alguma coisa com ela
      .catch(error => {
        console.log(error)
      }) // .catch é o método que recebe o erro da API e faz alguma coisa com ele

  }
  return (
    <Container>
      <Label htmlFor="order" content="Número da Ordem" required />
      <div>
        <Input name="order" value={orderNumber} onChange={event => setOrderNumber(event.target.value)} type="number" />
        <ContainerButton>
          <button className="pesquisar" onClick={handleSearch}>
            <Search size={20} />
          </button>
        </ContainerButton>
      </div>

      <ContainerChat>
        <h2>Histórico</h2>
        <ContainerMessages>
          {resultHistoryData.map((history, index) => {
            return (
              <Message key={index}>
                <span>{history.user}</span>
                <span>{history.history}</span>
                <span>{history.date}</span>
              </Message>
            )
          })}

          {/* <ContainerButton>
            <button className="check" onClick={handleSearch}>
              <CheckCircle2 size={20} />
              Marcar como solucionada
            </button>
          </ContainerButton> */}
        </ContainerMessages>
      </ContainerChat>

    </Container>
  )
}
