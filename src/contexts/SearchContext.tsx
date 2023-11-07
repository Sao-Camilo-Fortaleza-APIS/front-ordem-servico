import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { ResultHistoryDataProps, ResultOrderDataProps } from "../Pages/Formularios/Historico";

type SearchContextType = {
    resultOrderData: ResultOrderDataProps;
    setResultOrderData: Dispatch<SetStateAction<ResultOrderDataProps>>
    resultHistoryData: ResultHistoryDataProps[]
    setResultHistoryData: Dispatch<SetStateAction<ResultHistoryDataProps[]>>
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    orderNumber: string
    setOrderNumber: Dispatch<SetStateAction<string>>
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

type SearchProviderProps = {
    children: ReactNode
}

export function SearchProvider({ children }: SearchProviderProps) {
    const [resultOrderData, setResultOrderData] = useState<ResultOrderDataProps>({} as ResultOrderDataProps)
    const [resultHistoryData, setResultHistoryData] = useState<ResultHistoryDataProps[]>([] as ResultHistoryDataProps[])
    const [open, setOpen] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [orderNumber, setOrderNumber] = useState('')

    return (
        <SearchContext.Provider
            value={{
                resultOrderData,
                resultHistoryData,
                setResultOrderData,
                setResultHistoryData,
                open,
                setOpen,
                isLoading,
                setIsLoading,
                orderNumber,
                setOrderNumber
            }}
        >
            {children}
        </SearchContext.Provider>

    )
}

export function useSearch() {
    const context = useContext(SearchContext)

    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
}