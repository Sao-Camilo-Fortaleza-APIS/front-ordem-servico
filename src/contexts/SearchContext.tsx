import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { ResultHistoryDataProps, ResultOrderDataProps } from "../Pages/Formularios/Historico";

type SearchContextType = {
    resultOrderData: ResultOrderDataProps;
    setResultOrderData: Dispatch<SetStateAction<ResultOrderDataProps>>
    resultHistoryData: ResultHistoryDataProps[]
    setResultHistoryData: Dispatch<SetStateAction<ResultHistoryDataProps[]>>
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

type SearchProviderProps = {
    children: ReactNode
}

export function SearchProvider({ children }: SearchProviderProps) {
    const [resultOrderData, setResultOrderData] = useState<ResultOrderDataProps>({} as ResultOrderDataProps)
    const [resultHistoryData, setResultHistoryData] = useState<ResultHistoryDataProps[]>([] as ResultHistoryDataProps[])

    return (
        <SearchContext.Provider value={{ resultOrderData, resultHistoryData, setResultOrderData, setResultHistoryData }}>
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