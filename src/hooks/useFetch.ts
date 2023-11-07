import { useState } from "react"
import api from "../services/api"
import { useSearch } from "../contexts/SearchContext"

export interface ApiDataProps {
    number: number
    title: string
}

export const useFetch = () => {
    const { isLoading, setIsLoading } = useSearch()
    const [apiData, setApiData] = useState<ApiDataProps[]>([])
    const [serverError, setServerError] = useState(null)

    const fetchData = async (url: string) => {
        try {
            setIsLoading(true)
            const response = await api.get(url)
            setApiData(response.data)
        } catch (error: any) {
            setServerError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, setIsLoading, apiData, serverError, fetchData }
}