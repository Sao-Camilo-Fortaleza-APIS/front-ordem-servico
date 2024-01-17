import { AxiosError } from 'axios'
import { EyeIcon } from 'lucide-react'
import { toast } from 'react-toastify'
import { ResultOrderDataProps } from '../../Pages/Formularios/Historico'
import { useSearch } from '../../contexts/SearchContext'
import { ApiDataProps } from '../../hooks/useFetch'
import { configToastError } from '../../utils/toast-config'
import { Button } from '../Button'
import { Container, Th } from './styles'

import api from '../../services/api'

interface TableProps {
    data: ApiDataProps[]
}

export default function Table({ data }: TableProps) {
    const {
        setResultHistoryData,
        setResultOrderData,
        setOpen,
        setIsLoading,
        setOrderNumber,
    } = useSearch()
    async function handleSearch(orderNumber: number, event?: React.FormEvent<HTMLFormElement>) {
        event?.preventDefault();
        setOrderNumber('')
        setOpen(false);
        setIsLoading(true);

        await api // await é o método que espera a resposta da API
            .get(`/get/hist_ordem/${orderNumber}`) // .get é o método que faz a requisição para a API
            .then(response => {
                console.log(response.data.order)
                setResultHistoryData(response.data.history) // setResultHistoryData é o método que guarda os dados da ordem pesquisada no estado resultHistoryData
                setResultOrderData(response.data.order) // setResultHistoryData é o método que guarda os dados da ordem pesquisada no estado resultHistoryData
                setIsLoading(false)
            }) // .then é o método que recebe a resposta da API e faz alguma coisa com ela
            .catch((error: AxiosError) => {
                setResultHistoryData([]) // caso o número da ordem não seja encontrado, o estado resultHistoryData é zerado
                setResultOrderData({} as ResultOrderDataProps) // caso o número da ordem não seja encontrado, o estado resultOrderData é zerado
                if (error?.code === 'ERR_NETWORK') {
                    toast.error('Houve um problema de rede. Tente novamente mais tarde.', configToastError)
                } else {
                    toast.error('Número de ordem não encontrado, tente novamente.', configToastError)
                }
                console.error(error)
                setIsLoading(false)
            }) // .catch é o método que recebe o erro da API e faz alguma coisa com ele

    }
    return (
        <Container>
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <Th>Número ordem</Th>
                        <Th>Título da ordem</Th>
                        <Th style={{ textAlign: 'center' }}>Ação</Th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((result, index) => (
                        <tr key={index}>
                            <td>{result.number}</td>
                            <td>{result.title}</td>
                            <td style={{ textAlign: 'center' }}>
                                <Button variant='reply' onClick={() => handleSearch(result.number)}>
                                    <EyeIcon size={20} />
                                </Button>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </Container>
    )
}