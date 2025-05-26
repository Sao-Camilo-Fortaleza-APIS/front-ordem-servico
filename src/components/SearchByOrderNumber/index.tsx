import { Search } from "lucide-react";
import { useSearch } from "../../contexts/SearchContext";
import { useSearchOrder } from "../../hooks/useSearchOrder";
import { Button } from "../Button";
import { Input } from "../Input";
import { Label } from "../Label";
import { Fieldset } from "../Modal/styles";


export function SearchByOrderNumber() {
  const { setOpen, setIsLoading, orderNumber, setOrderNumber } = useSearch()
  const { searchOrder } = useSearchOrder()

  async function handleSearch(orderNumber: number, event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    await searchOrder(orderNumber, {
      setIsLoading,
      resetOrderNumber: () => setOrderNumber(''),
      closeModal: () => setOpen(false),
    })
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
