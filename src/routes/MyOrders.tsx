import { keepPreviousData, useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { FilterStatus } from "../components/FilterStatus"
import { Order, OrderProps } from "../components/Order"
import { SkeletonOrders } from "../components/SkeletonOrders"
import api from "../services/api"

export type OrderResponse = OrderProps[]

export function MyOrders() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const { pathname: location } = useLocation()
    const navigate = useNavigate();

    const user = Cookies.get('user') ?? ''
    let filtro = location === '/ordens/minhas' ? 'minhas' : 'pendentes'
    let group: number = Number(searchParams.get('group')) ?? 0
    let sector: string = searchParams.get('sector') ?? ''

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

    function filterOrdersByGroup(group: number, sectorSelected: string) {
        if (group === 0) {
            return sectorSelected !== '' ? responseOrders?.filter(order => order.location === sectorSelected) : responseOrders
        }
        const ordersByGroup = responseOrders?.filter((order: OrderProps) => order.group === Number(group))
        let filteredOrdersBySector = sectorSelected !== '' ? ordersByGroup?.filter(order => order.location === sectorSelected) : ordersByGroup
        return filteredOrdersBySector
    }

    const handleFilterChange = (filtros: string[]) => { setSelectedFilters(filtros) }

    let quantidade = group === 0
        ? responseOrders?.filter(order => selectedFilters.length === 0 || selectedFilters.includes(order.stage)).length
        : responseOrders
            ?.filter(order => order.group === group)
            ?.filter(order => selectedFilters.length === 0 || selectedFilters.includes(order.stage)).length

    useEffect(() => {
        if (!user || user === '') {
            toast.error('Sessão expirada, faça login novamente')
            Cookies.remove('exec.token')
            Cookies.remove('user')
            navigate('/entrar')
        }
    }, [user])

    if (isLoading) {
        return <SkeletonOrders />
    }

    return (
        <div className="wrapper">
            <div className="legend">
                {quantidade !== 0 && <span style={{ color: '#A1A1AA' }}>Nessa aba estão as OSs que estão atribuídas a você</span>}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '0.25rem' }}>
                <div className="quantidade">
                    {quantidade === 0 && <span>Nenhuma solicitação encontrada</span>}
                    {quantidade === 1 && <span>1 solicitação encontrada</span>}
                    {quantidade && quantidade > 1 ? <span>{quantidade} solicitações encontradas</span> : ''}
                    <span>{isFetching && <Loader size={16} className="animate-spin" />}</span>
                </div>

                <FilterStatus onFilterChange={handleFilterChange} />
            </div>

            <div className="list-orders">
                <div>
                    {filterOrdersByGroup(group, sector)
                        ?.filter(order => selectedFilters.length === 0 || selectedFilters.includes(order.stage))
                        .map((order: OrderProps) => {
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
                                        stage={order.stage}
                                        group_planej={order.group_planej}
                                    />
                                </button>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}