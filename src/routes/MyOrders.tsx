import { keepPreviousData, useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { Loader } from "lucide-react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Order, OrderProps } from "../components/Order"
import api from "../services/api"
import { Container } from "../styles/ViewOrders.styles"

export type OrderResponse = OrderProps[]

export function MyOrders() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { pathname: location } = useLocation()
    const navigate = useNavigate();
    const user = Cookies.get('user') ?? ''
    let filtro = location === '/ordens/minhas' ? 'minhas' : 'pendentes'
    let group: string = searchParams.get('group') ?? '';

    const { data: responseOrders, isFetching } = useQuery<OrderResponse>({
        queryKey: ['user', filtro, user],
        queryFn: async () => {
            const response = await api.get(`/get/order_user/executor/${user}`)

            if (response.status === 401) {
                toast.error('Sessão expirada, faça login novamente')
                Cookies.remove('exec.token')
                Cookies.remove('user')
                navigate('/entrar')
            }
            return response.data
        },
        placeholderData: keepPreviousData,
        enabled: true, // se false desabilita a pesquisa automática
    })

    function filterOrdersByGroup(group: string) {
        if (group === '') return responseOrders
        return responseOrders?.filter((order: OrderProps) => order.group === Number(group))
        /*  const listOrders = orders.filter(order => order.group === Number(group))
         return listOrders */
    }

    let quantidade =
        group
            ? responseOrders?.filter(order => order.group === Number(group)).length
            : responseOrders?.length

    return (
        <Container>
            <div className="wrapper">
                <div className="quantidade">
                    {quantidade === 0 && <span>Nenhum solicitação encontrada</span>}
                    {quantidade === 1 && <span>1 solicitação encontrada</span>}
                    {quantidade && quantidade > 1 && <span>{quantidade} solicitações encontradas</span>}
                    <span>{isFetching && <Loader size={16} className="animate-spin" />}</span>
                </div>

                <div className="list-orders">
                    <div>
                        {filterOrdersByGroup(group)?.map((order) => {
                            return (
                                <Order
                                    key={order.number}
                                    number={order.number}
                                    damage={order.number + ' ' + order.damage}
                                    date_order={order.date_order}
                                    location={order.location}
                                    requester={order.requester}
                                    contact={order.contact}
                                    group={order.group}
                                />
                            )
                        })}
                    </div>
                    {/* {<ListOrdersWithExecutor group={group} orders={responseOrders ?? []} />} */}
                </div>
            </div>
        </Container>
    )
}