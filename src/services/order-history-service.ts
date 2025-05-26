import { ResultHistoryDataProps, ResultOrderDataProps } from '../Pages/Formularios/Historico'
import api from './api'

export interface OrderResponse {
    history: ResultHistoryDataProps[]
    order: ResultOrderDataProps
}

export async function fetchOrderHistory(orderId: string): Promise<OrderResponse> {
    const response = await api.get<OrderResponse>(`/get/hist_ordem/${orderId}`)
    return response.data
}
