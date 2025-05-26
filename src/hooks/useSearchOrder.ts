import { AxiosError } from "axios";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useSearch } from "../contexts/SearchContext";
import { ResultOrderDataProps } from "../Pages/Formularios/Historico";
import { fetchOrderHistory } from "../services/order-history-service";
import { configToastError } from "../utils/toast-config";

type SearchOrderOptions = {
    onSuccess?: () => void
    onFinally?: () => void
    setIsLoading?: (loading: boolean) => void
    resetOrderNumber?: () => void
    closeModal?: () => void
}
export function useSearchOrder() {
    const { setResultHistoryData, setResultOrderData } = useSearch()

    const searchOrder = useCallback(
        async (orderId: number, options?: SearchOrderOptions) => {
            const {
                onSuccess,
                onFinally,
                setIsLoading,
                resetOrderNumber,
                closeModal
            } = options || {}

            if (!orderId) {
                setResultHistoryData([])
                setResultOrderData({} as ResultOrderDataProps)
                onFinally?.()
                return
            }

            setIsLoading?.(true)
            resetOrderNumber?.()
            closeModal?.()

            try {
                const { history, order } = await fetchOrderHistory(String(orderId))
                setResultHistoryData(history)
                setResultOrderData(order)
                onSuccess?.()
            } catch (error) {
                const err = error as AxiosError
                setResultHistoryData([])
                setResultOrderData({} as ResultOrderDataProps)

                if (err.response?.status === 404) {
                    toast.error("Número de ordem não encontrado", configToastError)
                } else if (err.code === 'ERR_NETWORK') {
                    toast.error("Houve um problema de rede", configToastError)
                } else {
                    toast.error("Erro ao buscar dados da ordem", configToastError)
                }
            } finally {
                setIsLoading?.(false)
                onFinally?.()
            }
        },
        [setResultHistoryData, setResultOrderData]
    )

    return { searchOrder }
}
