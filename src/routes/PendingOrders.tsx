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
    let sector: string = searchParams.get('sector') ?? '';

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
    })
    let quantidade = responsePendingOrders?.length
    let filteredOrdersBySector = sector !== '' ? responsePendingOrders?.filter(order => order.location === sector) : responsePendingOrders

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
            <div style={{ width: '100%', color: '#A1A1AA', margin: '0.25rem 0 0.5rem 0' }}>
                <span style={{ color: '#A1A1AA' }}>Legenda:</span>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#ef4444', width: '1rem', height: '1rem', borderRadius: '999px' }}>
                    </div>
                    <span>Ordens sem executor</span>
                </div>
            </div>

            <div className="quantidade">
                {quantidade === 0 && <span>Nenhuma solicitação encontrada</span>}
                {quantidade === 1 && <span>1 solicitação encontrada</span>}
                {quantidade && quantidade > 1 ? <span>{quantidade} solicitações encontradas</span> : ''}
                <span>{isFetching && <Loader size={16} className="animate-spin" />}</span>
            </div>

            <div className="list-orders">
                <div>
                    {filteredOrdersBySector?.map((order) => {
                        return (
                            <button
                                onClick={() => navigate(`/ordem/${order.number}`)}
                                key={order.number}
                                style={{ inset: "0", padding: "0", border: "0", margin: "0", width: "100%", backgroundColor: "transparent" }}
                            >
                                <Order
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
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}