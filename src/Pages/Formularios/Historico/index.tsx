import { useState } from "react";
import { Label } from "../../../components/Label";
import { Input } from "../../../components/Input";

import { Container, ContainerButton, ContainerChat, ContainerMessages, Message } from "./styles"; // Importação dos estilos

import { CheckCircle2, Search } from "lucide-react"; // Importação dos ícones

import api from "../../../services/api";

interface ResultOrderDataProps { // Essa interface é o tipo dos dados que a API retorna
  updated_at: string
  username: string
  text: string
}

export function Historico() {
  const [orderNumber, setOrderNumber] = useState<number>(0) // orderNumber é o estado que guarda o valor do input de número da ordem

  /**
   * resultOrderData é o estado que guarda os dados da ordem pesquisada, 
   * aqui ele é inicializado como um objeto vazio do tipo ResultOrderDataProps
   */
  const [resultOrderData, setResultOrderData] = useState<ResultOrderDataProps>({} as ResultOrderDataProps)

  async function handleSearch() {
    console.log();

    await api // await é o método que espera a resposta da API
      .get(`/get/hist_ordem/${orderNumber}`) // .get é o método que faz a requisição para a API
      .then(response => {
        console.log(response.data)
        setResultOrderData(response.data as ResultOrderDataProps) // setResultOrderData é o método que guarda os dados da ordem pesquisada no estado resultOrderData
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
          <Message>
            <span>myguel.angello</span>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
            <span>14/09/2023 - 10h12</span>
          </Message>

          <ContainerButton>
            <button className="check" onClick={handleSearch}>
              <CheckCircle2 size={20} />
              Marcar como solucionada
            </button>
          </ContainerButton>
        </ContainerMessages>
      </ContainerChat>

    </Container>
  )
}
