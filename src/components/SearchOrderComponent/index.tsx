import { Search } from "lucide-react";
import { Button } from "../Button";
import { Input } from "../Input";
import { Label } from "../Label";
import { Fieldset } from "../Modal/styles";
import { useSearch } from "../../contexts/SearchContext";
import { AxiosError } from "axios";
import { ResultOrderDataProps } from "../../Pages/Formularios/Historico";
import { toast } from "react-toastify";
import { configToastError } from "../../utils/toast-config";
import api from "../../services/api";


export function SearchOrderComponent() {
  const { setResultHistoryData, setResultOrderData, setOpen, setIsLoading, orderNumber, setOrderNumber } = useSearch()

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

  return (
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
  )
}
