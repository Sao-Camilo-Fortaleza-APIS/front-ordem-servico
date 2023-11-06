import { useEffect, useState } from "react"
import api from "../services/api"

export interface ApiDataProps {
    number: number
    title: string
}

export const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false)
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

    return { isLoading, apiData, serverError, fetchData }
}