import { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ChatScreen from "../components/ChatScreen";
import { Loader } from "../components/Load";
import { useSearch } from "../contexts/SearchContext";
import { ResultOrderDataProps } from "../Pages/Formularios/Historico";
import api from "../services/api";
import { configToastError } from "../utils/toast-config";

export function ServiceOrderDetails() {
    const { orderId } = useParams()
    const navigate = useNavigate()
    const {
        resultHistoryData,
        setResultHistoryData,
        resultOrderData,
        setResultOrderData,
        isLoading,
        setIsLoading,
    } = useSearch()

    async function getHistory() {
        // fetch history data
        await api.get(`/get/hist_ordem/${orderId}`)
            .then(response => {
                setResultHistoryData(response.data.history)
                setResultOrderData(response.data.order)
                setIsLoading(false)
            }).catch((error: AxiosError) => {
                setResultHistoryData([])
                setResultOrderData({} as ResultOrderDataProps)
                if (error?.code === 'ERR_NETWORK') {
                    toast.error('Houve um problema de rede. Tente novamente mais tarde.', configToastError)
                } else {
                    toast.error('Número de ordem não encontrado, tente novamente.', configToastError)
                }
                setIsLoading(false)
            })
    }

    useEffect(() => {
        setIsLoading(true)
        getHistory()
    }, [])

    if (isLoading) { return <Loader /> }

    return (
        <ChatScreen
            orderData={resultOrderData}
            historyData={resultHistoryData}
            onBack={() => navigate(-1)}
        />
    )
}
