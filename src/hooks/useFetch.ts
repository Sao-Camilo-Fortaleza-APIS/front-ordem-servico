import { useEffect, useState } from "react"
import api from "../services/api"

export const useFetch = (url: string) => {
    const [isLoading, setIsLoading] = useState(false)
    const [apiData, setApiData] = useState(null)
    const [serverError, setServerError] = useState(null)

    useEffect(() => {
        setIsLoading(true)

        const fetchData = async () => {
            try {
                const response = await api.get(url)
                const data = await response?.data

                setApiData(data)
                setIsLoading(false)
            } catch (error: any) {
                setServerError(error)
                setIsLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { isLoading, apiData, serverError }
}