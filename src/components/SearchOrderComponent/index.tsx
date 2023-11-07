import { Search } from "lucide-react";
import { Button } from "../Button";
import { Input } from "../Input";
import { Label } from "../Label";
import { Fieldset } from "../Modal/styles";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";


export function SearchOrderComponent(/* { orderNumber }: { orderNumber: number } */) {
  const [order, setOrder] = useState(0)
  const { apiData, fetchData, isLoading, serverError } = useFetch()

  const handleSearch = (query: number, e: any) => {
    e.preventDefault()
    fetchData(`/get/order_user/${query}`)
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
          value={order}
          onChange={event => setOrder(event.target.value)}
          placeholder="Número da ordem"
        />
        <Button type="submit" variant="search">
          <Search size="20" color="#71717a" />
        </Button>
      </Fieldset>
    </form>
  )
}
