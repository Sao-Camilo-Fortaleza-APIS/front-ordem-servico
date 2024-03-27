import * as Accordion from "@radix-ui/react-accordion";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import api from "../services/api";
import { Container, Header } from "../styles/ViewOrders.styles";
import Cookies from "js-cookie";

export type OrderResponse = OrderProps[]

export function ViewOrders() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams()
  const cachedOrdersData = queryClient.getQueryData<OrderResponse>(['user', Cookies.get('user')]); // Access cached data

  const user = Cookies.get('user') ?? ""

  const { data: ordersResponse, refetch, isFetching } = useQuery({
    queryKey: ['user', user],
    queryFn: async () => {
      const response = await api.get(`/get/order_user/executor/${user}`)
      const data = await response.data

      return data
    },
    placeholderData: keepPreviousData,
    enabled: true, // se false desabilita a pesquisa automática
  })

  function filterByExecutor(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    refetch()
  }
  function filterByPending(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
  }

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
          <Filter onClick={filterByExecutor} title="EM ATENDIMENTO" type="byExecutor" />
          <Button onClick={filterByPending}>AGUARDANDO</Button>
        </form>

        <div className="list-orders">
          <Accordion.Root type='single' collapsible>
            {cachedOrdersData && cachedOrdersData?.map(({ number, damage, date_order, location, requester }) => {
              return (
                <Order
                  key={number}
                  number={number}
                  damage={number + ' ' + damage}
                  date_order={date_order}
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
