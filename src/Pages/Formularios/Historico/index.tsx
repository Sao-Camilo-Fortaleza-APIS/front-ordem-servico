import { useState } from "react";

import { Modal } from "../../../components/Modal";
import { Loader } from "../../../components/Load";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Label } from "../../../components/Label";

import { Container, ContainerChat, ContainerMessages, Message } from "./styles"; // Importação dos estilos

import { removeHTML } from '../../../utils/remove-html'
import { convertDate } from "../../../utils/convert-date";

import EmptyHistory from '../../../Images/location_search.svg'
import { Search } from "lucide-react";

import api from "../../../services/api";
import { Fieldset } from "../../../components/Modal/styles";

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
  const [open, setOpen] = useState(true);

  /**
   * resultOrderData é o estado que guarda os dados da ordem pesquisada, 
   * aqui ele é inicializado como um objeto vazio do tipo ResultOrderDataProps
  */
  const [resultHistoryData, setResultHistoryData] = useState<ResultHistoryDataProps[]>([])

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpen(false);
    setIsLoading(true);

    await api
      .get(`/get/hist_ordem/${orderNumber}`)
      .then((response) => {
        console.log(response.data.history);
        setResultHistoryData(response.data.history);
        setOrderNumber("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading && <Loader />}

      <Container>
        <ContainerChat>

          <h2>Histórico</h2>

          <ContainerMessages>
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
                  <Button
                    type="submit"
                  >
                    <Search size="20" color="#71717a" />
                  </Button>
                </Fieldset>
              </form>
            </Modal>

            {resultHistoryData.length === 0 ? (
              <div className="div-image">
                <img className="image" src={EmptyHistory} alt="Não há histórico" />
              </div>
            ) : (
              resultHistoryData.map((history, index) => {
                if (resultHistoryData.length > 3 && index > resultHistoryData.length - 4) { // Se o tamanho do array for maior que 3 e o index for menor que 3, ele renderiza os 3 primeiros elementos do array
                  if (index === 0) { // No terceiro elemento do array, ele renderiza o botão de ver mais
                    return (
                      <>
                        <a href="#"><span>Ver mais</span></a>
                        <br />
                        <br />
                        <Message key={index}>
                          <span>{history.user}</span>
                          <span>{removeHTML(history.history)}</span>
                          <span>{convertDate(history.date)}</span>
                        </Message>
                      </>
                    )
                  }

                  return (
                    <Message key={index}>
                      <span>{history.user}</span>
                      <span>{removeHTML(history.history)}</span>
                      <span>{convertDate(history.date)}</span>
                    </Message>
                  )
                } else if (index < 1) {
                  return (
                    <Message key={index}>
                      <span>Ver mais</span>
                    </Message>)
                }
              })
            )}


          </ContainerMessages>
        </ContainerChat>
      </Container>
    </>
  )
}
