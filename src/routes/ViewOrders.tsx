import * as Accordion from "@radix-ui/react-accordion";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { MouseEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import api from "../services/api";
import { Container, Header } from "../styles/ViewOrders.styles";
import Cookies from "js-cookie";
import { getUser } from "../hooks/userCookies";
import { Loader } from "../components/Load";

export type OrderResponse = OrderProps[]

export function ViewOrders() {
  const token = Cookies.get('exec.token')
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()
  const user = Cookies.get('user')
  const cachedOrdersData = queryClient.getQueryData<OrderResponse>(['user', user]); // Access cached data

  const filtro = searchParams.get('filtro') ? Number(searchParams.get('filtro')) : 1


  const { data: ordersResponse, refetch, isFetching } = useQuery<OrderResponse>({
    queryKey: ['user', user],
    queryFn: async () => {
      const response = await api.get(`/get/order_user/executor/${user}?filtro=${filtro}`)
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

  function logOut() {
    Cookies.remove('exec.token')
    Cookies.remove('user')
    queryClient.clear()
    navigate('/entrar')
  }

  useEffect(() => {
    if (!token) {
      navigate('/entrar')
    }
  }
    , [])

  return (
    <Container>
      <Header>
        <img src="./assets/logo_horizontal.svg" alt="Logo São Camilo" />

        <LogOut onClick={logOut} className="icon" size={26} />
      </Header>

      <div className="wrapper">
        <div className="quantidade">
          <span>Solicitações</span>

          <span>{ordersResponse ? ordersResponse.length : 0}</span>
        </div>
        <form className="filter">
          <Filter onClick={filterByExecutor} title="EM ATENDIMENTO" type="byExecutor" />
          <Button onClick={filterByPending}>AGUARDANDO</Button>
        </form>

        {isFetching ? (<Loader />) : (
          <div className="list-orders">
            <Accordion.Root type='single' collapsible>
              {ordersResponse && ordersResponse?.map(({ number, damage, date_order, location, requester }) => {
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
        )}
      </div>
    </Container>
  )
}
