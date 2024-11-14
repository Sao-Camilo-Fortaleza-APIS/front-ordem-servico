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
            status="open"
            onBack={() => navigate(-1)}
        />
    )
}

{/* <Container>
    <OrderDetails>
        <h4>
            {resultOrderData.damage}
        </h4>
        <div>
            <span style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                {resultOrderData.describe}
            </span>
            <span className='infos'>
                <User size={16} color='#a1a1aa' />
                {capitalizeFirstLetterOfWords(resultOrderData.requester)} - {resultOrderData.contact}
            </span>
            <span className='infos'>
                <MapPin size={16} color='#a1a1aa' />
                {capitalizeFirstLetterOfWords(resultOrderData.location)}
            </span>
            <span className='infos'>
                <Clock size={16} color='#a1a1aa' />
                {convertDate(resultOrderData.date_order)}
            </span>
        </div>
    </OrderDetails>

    <ContainerChat>
        <ContainerMessages>
            {resultHistoryData.map((history, index) => {
                return (
                    <Message key={index} style={{ width: "50%" }}>
                        <span>{history.user}</span>
                        <span dangerouslySetInnerHTML={{ __html: history.history }}></span>
                        <span>{convertDate(history.date)}</span>
                    </Message>
                )
            })}
        </ContainerMessages>
    </ContainerChat>

    <TakeOrderForm numberOrder={resultOrderData.number} />
</Container> */}