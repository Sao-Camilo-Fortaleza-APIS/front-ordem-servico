import { EyeIcon } from 'lucide-react'
import { ApiDataProps } from '../../hooks/useFetch'
import { Button } from '../Button'
import { Container, Th } from './styles'

interface TableProps {
    data: ApiDataProps[]
}

export default function Table({ data }: TableProps) {
    return (
        <Container>
            <table>
                <tr>
                    <Th>Número ordem</Th>
                    <Th>Título da ordem</Th>
                    <Th>Ação</Th>
                </tr>
                {data.map((result, index) => (
                    <tr key={index}>
                        <td>{result.number}</td>
                        <td>{result.title}</td>
                        <Button variant='reply' onClick={(e) => alert("teste")}>
                            <EyeIcon size={20} />
                        </Button>
                    </tr>
                )
                )}
            </table>
        </Container>
    )
}