import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Order } from "../components/Order";
import api from "../services/api";
import { OrderResponse } from "./MyOrders";

export function PendingOrders() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { pathname: location } = useLocation()
    const navigate = useNavigate();
    const user = Cookies.get('user') ?? ''
    let filtro = location === '/ordens/minhas' ? 'minhas' : 'pendentes'
    let group: string = searchParams.get('group') ?? '';

    const { data: responsePendingOrders, isFetching, refetch } = useQuery<OrderResponse>({
        queryKey: ['user', filtro, user],
        queryFn: async () => {
            if (group === '') return []

            const response = await api.get(`/get/orders/workgroup/${group}`)

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
    let quantidade = responsePendingOrders?.length

    useEffect(() => {
        refetch()
    }, [group])
    useEffect(() => {
        //verificar se usuário está logado
        if (!user || user === '') {
            toast.error('Sessão expirada, faça login novamente')
            Cookies.remove('exec.token')
            Cookies.remove('user')
            navigate('/entrar')
        }
    }, [user])
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
                    {responsePendingOrders?.map((order) => {
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
            </div>
        </div>
    )
}