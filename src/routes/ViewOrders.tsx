import * as Accordion from "@radix-ui/react-accordion";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Loader, LogOut } from "lucide-react";
import { MouseEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import api from "../services/api";
import { Container, Header } from "../styles/ViewOrders.styles";
import { ListOrdersWithExecutor } from "../components/ListOrdersWithExecutor";
export type OrderResponse = OrderProps[]

export function ViewOrders() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()
  const user = Cookies.get('user') ?? ''
  const cachedOrdersData = queryClient.getQueryData<OrderResponse>(['user', user]); // Access cached data

  let filtro = searchParams.get('filtro') ? (searchParams.get('filtro')) : 'sem-executor'
  let group: string = searchParams.get('group') ?? '';

  const { data: responseQueries, isFetching } = useQuery({
    queryKey: ['user', filtro, user],
    queryFn: async () => {
      // use promise.all to fetch multiple queries
      const [ordernsWithExecutor, userWorkgroups] = await Promise.all([
        api.get(`/get/order_user/executor/${user}`),
        api.get(`/get/workgroup/user`),
      ])


      if (ordernsWithExecutor.status === 401 || userWorkgroups.status === 401) {
        toast.error('Sessão expirada, faça login novamente')
        Cookies.remove('exec.token')
        Cookies.remove('user')
        navigate('/entrar')
      }
      // Handle each response individually
      const orders = await ordernsWithExecutor.data;
      const groups = await userWorkgroups.data;
      // Combine the data as needed
      const data = {
        "orders": orders as OrderResponse,
        "groups": groups
      }
      return data
    },
    placeholderData: keepPreviousData,
    enabled: true, // se false desabilita a pesquisa automática
  })

  let quantidade = group ? responseQueries?.orders.filter(order => order.group === Number(group)).length : responseQueries?.orders.length

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
        <select
          className="select-group"
          name="groups"
          id="groups"
          onChange={(e) => {
            setSearchParams(params => {
              params.set('group', e.target.value)
              return params
            })
          }}
          value={group ? group : ''}
        >
          <option value="">Todos os grupos</option>
          {responseQueries?.groups && responseQueries?.groups.map((group: any) => {
            return <option key={group.code} value={group.code}>{group.describe}</option>
          })}
        </select>
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

        <div className="quantidade">
          {quantidade === 0 && <span>Nenhum solicitação encontrada</span>}
          {quantidade === 1 && <span>1 solicitação encontrada</span>}
          {quantidade && quantidade > 1 && <span>{quantidade} solicitações encontradas</span>}
          <span>{isFetching && <Loader size={16} className="animate-spin" />}</span>
        </div>

        <div className="list-orders">
          {filtro === 'do-executor' && <ListOrdersWithExecutor group={group} orders={responseQueries?.orders ?? []} />}
        </div>
      </div>
    </Container>
  )
}
