import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import { MouseEvent } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Filter } from "../components/Filter";
import api from "../services/api";
import { Container, Header } from "../styles/ViewOrders.styles";

export interface GroupProps {
  code: number,
  describe: string
}
export type GroupResponse = GroupProps[]

export function ViewOrders() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pathname: location } = useLocation()
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  let group: string = searchParams.get('group') ?? '';

  const { data: groups, isFetching } = useQuery<GroupResponse>({
    queryKey: ['get-groups'],
    queryFn: async () => {
      const response = await api.get(`/get/workgroup/user`)

      if (response.status === 401) {
        toast.error('Sessão expirada, faça login novamente')
        Cookies.remove('exec.token')
        Cookies.remove('user')
        navigate('/entrar')
      }
      return response.data
    },
    placeholderData: keepPreviousData,
    enabled: true, // se false desabilita a nova busca automática
  })

  function filterByExecutor(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    navigate('/ordens/minhas')
  }
  function filterByPending(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    navigate('/ordens/pendentes')
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
        <img src="../assets/logo_horizontal.svg" alt="Logo São Camilo" />

        <LogOut onClick={logOut} className="icon" size={26} />
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

        <div className="label-groups">
          <span>Grupo de trabalho</span>
        </div>
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
          {location === '/ordens/minhas' && <option value="">Todos os grupos</option>}
          {location === '/ordens/pendentes' && <option disabled value="">Selecione um grupo</option>}
          {groups && groups?.map((group: GroupProps) => {
            return <option key={group.code} value={group.code}>{group.describe}</option>
          })}
        </select>
      </div>

      <Outlet />
    </Container>
  )
}
