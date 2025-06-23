import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatScreen } from "../components/ChatScreen";
import { Loader } from "../components/Load";
import { useSearch } from "../contexts/SearchContext";
import { useHistoryData } from "../hooks/useHistoryData";

export function ServiceOrderDetails() {
    const { orderId } = useParams()
    const navigate = useNavigate()
    const {
        resultHistoryData,
        resultOrderData,
    } = useSearch()

    const [isLoading, setLoading] = useState(true)
    const { getHistory } = useHistoryData()

    useEffect(() => {
        if (orderId) {
            getHistory(orderId, setLoading)
        }
    }, [orderId])

    if (isLoading) { return <Loader /> }

    return (
        <ChatScreen
            orderData={resultOrderData}
            historyData={resultHistoryData}
            onBack={() => navigate(-1)}
        />
    )
}
