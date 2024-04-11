import * as Accordion from "@radix-ui/react-accordion";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, LogOut } from "lucide-react";
import { MouseEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import api from "../services/api";
import { Container, Header } from "../styles/ViewOrders.styles";
import Cookies from "js-cookie";
import { getUser } from "../hooks/userCookies";
import { toast } from "react-toastify";

export type OrderResponse = OrderProps[]

export function ViewOrders() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()
  const user = Cookies.get('user') ?? ''
  const cachedOrdersData = queryClient.getQueryData<OrderResponse>(['user', user]); // Access cached data

  const filtro = searchParams.get('filtro') ? (searchParams.get('filtro')) : 'sem-executor'


  const { data: ordersResponse, refetch, isFetching } = useQuery<OrderResponse>({
    queryKey: ['user', filtro, user],
    queryFn: async () => {
      const response = await api.get(`/get/order_user/executor/${user}?filtro=${filtro}`)

      if (response.status === 401) {
        toast.error('Sessão expirada, faça login novamente')
        Cookies.remove('exec.token')
        Cookies.remove('user')
        navigate('/entrar')
      }
      const data = await response.data

      return data
    },
    placeholderData: keepPreviousData,
    enabled: true, // se false desabilita a pesquisa automática
  })

  function filterByExecutor(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setSearchParams(params => {
      params.set('filtro', 'do-executor')
      return params
    })
  }
  function filterByPending(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setSearchParams(params => {
      params.set('filtro', 'sem-executor')
      return params
    })
  }

  function logOut() {
    Cookies.remove('exec.token')
    Cookies.remove('user')
    queryClient.clear()
    navigate('/entrar')
  }

  /*  useEffect(() => {
     const token = Cookies.get('exec.token')
     if (!token) {
       navigate('/entrar')
     }
   }, []) */

  return (
    <Container>
      <Header>
        <img src="./assets/logo_horizontal.svg" alt="Logo São Camilo" />

        <LogOut onClick={logOut} className="icon" size={26} />
      </Header>

      <div className="wrapper">
        <div className="quantidade">
          <span>Solicitações {isFetching && <Loader size={18} className="animate-spin" />}</span>

          <span>{ordersResponse ? ordersResponse.length : 0}</span>
        </div>
        <div className="filter">
          <Filter
            title="EM ATENDIMENTO"
            type="do-executor"
            onClick={filterByExecutor}
            isActive={filtro === 'do-executor'}
          />

          <Filter
            title="AGUARDANDO"
            type="sem-executor"
            onClick={filterByPending}
            isActive={filtro === 'sem-executor'}
          />
        </div>

        <div className="list-orders">
          {filtro === 'do-executor' ? (
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
          ) : (
            <Accordion.Root type='single' collapsible>
              {Array.from({ length: 10 }).map((_, index) => (
                <Order
                  key={index}
                  number={index}
                  damage={`Damage ${index}`}
                  date_order={new Date().toISOString()}
                  location="Location"
                  requester="Requester"
                />
              ))}
            </Accordion.Root>
          )}
        </div>
      </div>
    </Container>
  )
}
