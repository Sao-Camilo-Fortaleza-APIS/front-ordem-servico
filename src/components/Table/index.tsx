import { EyeIcon } from 'lucide-react'
import { ApiDataProps } from '../../hooks/useFetch'

interface TableProps {
    data: ApiDataProps[]
}

export default function Table({ data }: TableProps) {
    return (
        <table style={{ width: '100%' }}>
            <tr>
                <th>Número ordem</th>
                <th>Título da ordem</th>
            </tr>
            {data.map((result, index) => (
                <tr key={index}>
                    <td>{result.number}</td>
                    <td>{result.title}</td>
                    <button onClick={(e) => alert("teste")} style={{ width: '100%' }}>
                        <EyeIcon size={20} />
                    </button>
                </tr>
            )
            )}
        </table>
    )
}