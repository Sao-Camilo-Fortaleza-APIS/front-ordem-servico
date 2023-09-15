import { useState } from "react";
import { Input } from "../../../components/Input";
import api from "../../../services/api";
import { Container, ContainerButton, ContainerChat, ContainerMessages, Message } from "./styles";
import { Label } from "../../../components/Label";
import { Check, CheckCircle, CheckCircle2, Search } from "lucide-react";

interface ResultOrderDataProps {
  updated_at: string
  username: string
  text: string
}

export function Historico() {
  const [orderNumber, setOrderNumber] = useState<number>(0)
  const [resultOrderData, setResultOrderData] = useState<ResultOrderDataProps>({} as ResultOrderDataProps)

  async function handleSearch() {
    alert("OIIII")
    const response = await api.get(`/get/hist_ordem?nr_ordem_servico=${orderNumber}`)
    setResultOrderData(response.data as ResultOrderDataProps)
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

          <Message>
            <span>myguel.angello</span>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
            <span>14/09/2023 - 10h12</span>
          </Message>

          <Message>
            <span>myguel.angello</span>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum esse qui nam minima! Amet nostrum esse veniam fuga eaque obcaecati eius recusandae fugiat, labore, facilis minus doloremque? Animi, repudiandae. Eaque.
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
