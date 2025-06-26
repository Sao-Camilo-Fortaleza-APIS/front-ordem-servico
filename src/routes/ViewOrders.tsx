import * as Popover from "@radix-ui/react-popover";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import { MouseEvent, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Filter } from "../components/Filter";
import { Button, PopoverContent } from "../components/FilterStatus/styles";
import { Msg } from "../components/Msg";
import { NotificationBell } from "../components/Notification/NotificationBell";
import { NotificationList } from "../components/Notification/NotificationList";
import { useNotification } from "../hooks/useNotification";
import { useSocket } from "../hooks/useSocket";
import api from "../services/api";
import { Container, Header } from "../styles/ViewOrders.styles";
import { OrderResponse } from "./MyOrders";

export interface GroupProps {
  code: number,
  describe: string
}

export function ViewOrders() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pathname: location } = useLocation()
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = Cookies.get('user') ?? ''
  let filtro = location === '/ordens/minhas' ? 'minhas' : 'pendentes'
  let group: string = searchParams.get('group') ?? '';
  let sector: string = searchParams.get('sector') ?? '';
  let status: string = searchParams.get('status') ?? '';
  const { notifications } = useNotification(user)

  const { socket } = useSocket({ user })

  const cachedOrders = queryClient.getQueryData(['orders', filtro, user]);

  const { data: groups, isFetching } = useQuery<GroupProps[]>({
    queryKey: ['get-groups'],
    queryFn: async () => {
      const response = await api.get(`/get/workgroup/user`)

      if (response.status === 401) {
        toast.error('Sessão expirada, faça login novamente')
        logout()
      }
      return response.data
    },
    placeholderData: keepPreviousData,
    //enabled: true, // se false desabilita a nova busca automática
    refetchOnWindowFocus: true,
  })

  const { data: ordersResponse } = useQuery<OrderResponse>({
    queryKey: ['user', filtro, user],
    queryFn: async () => {
      if (filtro === 'minhas') {
        const response = await api.get(`/get/orders/executor/${user}`)
        return response.data
      }

      if (group === '') return []

      const response = await api.get(`/get/orders/workgroup/${group}`)
      return response.data
    },
    initialData: cachedOrders as OrderResponse | undefined,
    enabled: true,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  })

  // filtrar os setores baseados nas OSs retornadas por grupo caso o grupo seja selecionado, caso contrário, retorna todos os setores das OSs
  const filteredSectors = group !== '' ? Array.from(new Set(ordersResponse?.filter(order => order.group === Number(group)).map(order => order.location).sort())) : Array.from(new Set(ordersResponse?.map(order => order.location).sort()))
  const filteredStatusOptions = status !== '' ? Array.from(new Set(ordersResponse?.filter(order => order.stage === status).map(order => order.stage).sort())) : Array.from(new Set(ordersResponse?.map(order => order.stage).sort()))
  const isLoadingOrders = isFetching || !ordersResponse || filteredSectors?.length === 0 || filteredStatusOptions?.length === 0
  function filterByExecutor(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    navigate('/ordens/minhas')
  }
  function filterByPending(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    navigate('/ordens/pendentes')
  }
  function logout() {
    Cookies.remove('exec.token')
    Cookies.remove('user')
    queryClient.clear()
    socket.disconnect()
    navigate('/entrar')
  }

  useEffect(() => {
    socket.on("new_notification", (data) => {
      toast(Msg, {
        data: { title: 'Novo histórico!', content: `${data?.message}` },
        hideProgressBar: true,
        style: { border: '1px solid #e4e4e7', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
        position: 'top-center',
      })
      queryClient.invalidateQueries({ queryKey: ["notifications", user] })
    })

  }, [socket])

  return (
    <Container>
      <Header>
        <img className="logo-horizontal" src="../assets/logo_horizontal.png" alt="Logo São Camilo" width={1000} />
        <img className="petala" src="/assets/petala_cruz.png" alt="Logo horizontal" width={56} />

        <div className="hero" style={{ display: 'flex', alignItems: 'center' }}>

          <span className="user-name">{user}</span>

          <Popover.Root>
            <Popover.Trigger asChild>
              <Button title="Abrir notificações">
                <NotificationBell unreadCount={notifications?.length ?? 0} />
              </Button>
            </Popover.Trigger>
            <PopoverContent
              side="bottom"
              sideOffset={5}
              align="end"
              collisionPadding={5}
              avoidCollisions={true}
            >
              <NotificationList executor={user} />
            </PopoverContent>
          </Popover.Root>

          <button className="logout" onClick={logout}>
            <LogOut className="icon" size={24} />
            Sair
          </button>
        </div>
      </Header>
      <div className="wrapper">
        <div className="filter">
          <Filter
            title="MINHAS OS's"
            onClick={filterByExecutor}
            isActive={location === '/ordens/minhas'}
          />

          <Filter
            title="PENDENTES"
            onClick={filterByPending}
            isActive={location === '/ordens/pendentes'}
          />
        </div>

        <section style={{ width: '100%', gap: '0.5rem', display: 'flex', }}>
          <div style={{ width: '100%' }}>
            <span className="label-groups">Grupo de trabalho</span>
            <select
              className="select-group"
              name="groups"
              id="groups"
              onChange={(e) => {
                setSearchParams(params => {
                  params.set('group', e.target.value)
                  params.set('sector', '')
                  params.set('status', '')
                  return params
                })
              }}
              value={group ? group : ''}
            >
              {location === '/ordens/minhas' && <option value="">Todos os grupos</option>}
              {location === '/ordens/pendentes' && <option disabled value="">Selecione um grupo</option>}
              {groups && groups?.map((group: GroupProps) => {
                return <option key={group.code} value={group.code}>{group.describe}</option>
              })}
            </select>
          </div>

          <div style={{ width: '100%' }}>
            <span className="label-groups">Setor solicitante</span>
            <select
              className="select-group"
              name="sectors"
              id="sectors"
              disabled={location === '/ordens/pendentes' && group === ''}
              onChange={(e) => {
                setSearchParams(params => {
                  params.set('sector', e.target.value)
                  return params
                })
              }}
              value={sector ? sector : ''}
            >
              {isLoadingOrders ? (
                <>
                  {location === '/ordens/minhas' && <option value="">Todos os setores</option>}
                  {location === '/ordens/pendentes' && <option disabled value="">Selecione um grupo primeiro</option>}
                </>
              ) : (
                <>
                  <option value="">Todos os setores</option>
                  {filteredSectors?.map((sector, index) => {
                    return <option key={index} value={sector}>{sector}</option>
                  })}
                </>
              )}
            </select>
          </div>
        </section>
      </div>
      <Outlet />
    </Container>
  )
}
