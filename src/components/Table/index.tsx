import { EyeIcon } from 'lucide-react'
import { useSearch } from '../../contexts/SearchContext'
import { useSearchOrder } from '../../hooks/useSearchOrder'
import { convertDate } from '../../utils/convert-date'
import { StatusBadge } from '../BadgeStatus'
import { Button } from '../Button'
import { Container, Td, Th, Tr } from './styles'

export interface ApiDataProps {
    number: number
    title: string
    stage: string
    date: string
}

interface TableProps {
    data: ApiDataProps[]
}

export default function Table({ data }: TableProps) {
    const {
        setOpen,
        setIsLoading,
        setOrderNumber,
    } = useSearch()
    const { searchOrder } = useSearchOrder()
    async function handleSearch(orderNumber: number, event?: React.FormEvent<HTMLFormElement>) {
        event?.preventDefault();

        await searchOrder(orderNumber, {
            setIsLoading,
            resetOrderNumber: () => setOrderNumber(''),
            closeModal: () => setOpen(false),
        })
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
                            <Td style={{ textAlign: "left" }} >{result.title}</Td>
                            <Td><StatusBadge textTransForm='uppercase' status={result.stage} /></Td>
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