import { AxiosError } from 'axios'
import { EyeIcon } from 'lucide-react'
import { toast } from 'react-toastify'
import { ResultOrderDataProps } from '../../Pages/Formularios/Historico'
import { useSearch } from '../../contexts/SearchContext'
import api from '../../services/api'
import { convertDate } from '../../utils/convert-date'
import { configToastError } from '../../utils/toast-config'
import { Button } from '../Button'
import { Container, Td, Th, Tr } from './styles'

interface ApiDataProps {
    number: number
    title: string
    closed: string
    date: string
}

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
                {data.length > 0 && (
                    <caption style={{ color: '#a1a1aa', textAlign: "right", marginBottom: '1rem' }}>
                        {data.length} ordens encontradas
                    </caption>
                )}
                <thead>
                    <Tr>
                        <Th>Data</Th>
                        <Th>Ordem</Th>
                        <Th style={{ textAlign: "left", paddingLeft: '0.75rem' }}>Título</Th>
                        <Th>Status</Th>
                        <Th style={{ textAlign: 'center' }}>Ação</Th>
                    </Tr>
                </thead>
                <tbody>
                    {data.map((result, index) => (
                        <Tr key={index}>
                            <Td style={{ padding: '0' }}>{convertDate(result.date, 'DD[/]MM[/]YYYY')}</Td>
                            <Td>{result.number}</Td>
                            <Td
                                style={{ textAlign: "left" }}
                            >
                                {result.title}
                            </Td>
                            <Td>
                                {result.closed === "S"
                                    ? (<span className="badge badge-closed">Encerrada</span>)
                                    : (<span className="badge badge-open">Aberta</span>)
                                }
                            </Td>
                            <Td>
                                <Button variant='reply' onClick={() => handleSearch(result.number)}>
                                    <EyeIcon size={20} />
                                </Button>
                            </Td>
                        </Tr>
                    )
                    )}
                </tbody>
            </table>
        </Container>
    )
}