import { LogOut } from "lucide-react";
import { Button } from "../components/Button";
import { Order } from "../components/Order";
import { Container, Header } from "../styles/ViewOrders.styles";
import { QueryCache, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import * as Accordion from "@radix-ui/react-accordion";

export interface OrderResponse {
  executor: string
  orders: SingleOrder[]
}

export interface SingleOrder {
  damage: string
  date_order: string
  location: string
  number: number
  requester: string
}

export type Order = OrderResponse[]

export function ViewOrders() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams()
  const cachedOrdersData = queryClient.getQueryData<Order>(['get-orders', searchParams.get('executor')]); // Access cached data

  console.log(cachedOrdersData)

  return (
    <Container>
      <Header>
        <img src="./assets/logo_horizontal.svg" alt="Logo São Camilo" />

        <LogOut className="icon" size={26} />
      </Header>

      <div className="wrapper">
        <div className="quantidade">
          <span>Solicitações</span>

          <span>0</span>
        </div>
        <form className="filter">
          <Button>EM ATENDIMENTO</Button>
          <Button>AGUARDANDO</Button>
        </form>

        <div className="list-orders">
          <Accordion.Root type='single' collapsible>
            {cachedOrdersData && cachedOrdersData[0].orders.map(({ number, damage, date_order, location, requester }) => {
              return (
                <Order
                  key={number}
                  number={number}
                  damage={number + ' ' + damage}
                  date={date_order}
                  location={location}
                  requester={requester}
                />
              )
            })}
          </Accordion.Root>
        </div>
      </div>
    </Container>
  )
}
