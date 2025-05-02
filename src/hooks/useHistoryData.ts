import { AxiosError } from 'axios'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useSearch } from '../contexts/SearchContext'
import api from '../services/api'
import { configToastError } from '../utils/toast-config'

export function useHistoryData() {
    const {
        setResultHistoryData,
        setResultOrderData
    } = useSearch()

    const getHistory = useCallback(
        async (orderId: string, setIsLoading?: (loading: boolean) => void) => {
            setIsLoading?.(true)
            try {
                const response = await api.get(`/get/hist_ordem/${orderId}`)
                setResultHistoryData(response.data.history)
                setResultOrderData(response.data.order)
            } catch (error) {
                const err = error as AxiosError
                setResultHistoryData([])
                setResultOrderData({} as any) // substitua por sua tipagem correta
                if (err?.code === 'ERR_NETWORK') {
                    toast.error('Houve um problema de rede. Tente novamente mais tarde.', configToastError)
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
