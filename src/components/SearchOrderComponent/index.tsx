import { Search } from "lucide-react";
import { Button } from "../Button";
import { Input } from "../Input";
import { Label } from "../Label";
import { Fieldset } from "../Modal/styles";
import { useState } from "react";


export function SearchOrderComponent() {
  const [orderNumber, setOrderNumber] = useState<string>('')
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
