import { AxiosError } from 'axios'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useSearch } from '../contexts/SearchContext'
import { ResultOrderDataProps } from '../Pages/Formularios/Historico'
import { fetchOrderHistory } from '../services/order-history-service'
import { configToastError } from '../utils/toast-config'

export function useHistoryData() {
    const {
        setResultHistoryData,
        setResultOrderData
    } = useSearch()

    const getHistory = useCallback(
        async (orderId: string, setIsLoading?: (loading: boolean) => void) => {
            if (!orderId) {
                setResultHistoryData([])
                setResultOrderData({} as ResultOrderDataProps)
                return
            }

            setIsLoading?.(true)

            try {
                const { history, order } = await fetchOrderHistory(orderId)
                setResultHistoryData(history)
                setResultOrderData(order)
            } catch (error) {
                const err = error as AxiosError
                setResultHistoryData([])
                setResultOrderData({} as ResultOrderDataProps)

                if (err?.code === 'ERR_NETWORK') {
                    toast.error('Houve um problema de rede. Tente novamente mais tarde.', configToastError)
                } else if (err.response?.status === 404) {
                    toast.error('Número de ordem não encontrado, tente novamente.', configToastError)
                } else {
                    toast.error('Número de ordem não encontrado, tente novamente.', configToastError)
                }
            } finally {
                setIsLoading?.(false)
            }
        },
        [setResultHistoryData, setResultOrderData]
    )

    return { getHistory }
}
