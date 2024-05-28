import { keepPreviousData, useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { Loader } from "lucide-react"
import { useEffect } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Order, OrderProps } from "../components/Order"
import api from "../services/api"

export type OrderResponse = OrderProps[]

export function MyOrders() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { pathname: location } = useLocation()
    const navigate = useNavigate();

    const user = Cookies.get('user') ?? ''
    let filtro = location === '/ordens/minhas' ? 'minhas' : 'pendentes'
    let group: number = Number(searchParams.get('group')) ?? 0

    const { data: responseOrders, isLoading, isFetching } = useQuery<OrderResponse>({
        queryKey: ['user', filtro, user],
        queryFn: async () => {
            const response = await api.get(`/get/orders/executor/${user}`)

            if (response.status === 401) {
                toast.error('Sessão expirada, faça login novamente')
                Cookies.remove('exec.token')
                Cookies.remove('user')
                navigate('/entrar')
                return
            }
            return response.data
        },
        placeholderData: keepPreviousData,
    })
    //enabled: true, // se false desabilita a pesquisa automática

    function filterOrdersByGroup(group: number) {
        if (group === 0) {
            return responseOrders?.filter((order: OrderProps) => order.awaiting_validate === "Não")
        }
        const ordersByGroup = responseOrders?.filter((order: OrderProps) => order.group === Number(group))
        return ordersByGroup?.filter((order: OrderProps) => order.awaiting_validate === "Não")
    }

    let quantidade =
        group
            ? responseOrders?.filter((order: OrderProps) => order.awaiting_validate === "Não")?.filter(order => order.group === Number(group)).length
            : responseOrders?.filter((order: OrderProps) => order.awaiting_validate === "Não").length


    useEffect(() => {
        //verificar se usuário está logado
        if (!user || user === '') {
            toast.error('Sessão expirada, faça login novamente')
            Cookies.remove('exec.token')
            Cookies.remove('user')
            navigate('/entrar')
        }
    }, [user])

    if (isLoading) {
        return null
    }

    return (
        <div className="wrapper">
            <div className="quantidade">
                {quantidade === 0 && <span>Nenhuma solicitação encontrada</span>}
                {quantidade === 1 && <span>1 solicitação encontrada</span>}
                {quantidade && quantidade > 1 ? <span>{quantidade} solicitações encontradas</span> : ''}
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
                                describe={order.describe}
                                awaiting_validate={order.awaiting_validate}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}