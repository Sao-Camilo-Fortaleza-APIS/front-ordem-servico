import { Search } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useSearch } from '../../contexts/SearchContext'
import api from '../../services/api'
import { formatCPF, sanitizeCPF } from '../../utils/format-cpf'
import { Button } from '../Button'
import { Input } from '../Input'
import { Label } from '../Label'
import { Fieldset } from '../Modal/styles'
import Table from '../Table'

export function SearchByCPF() {
    const { isLoading, setIsLoading } = useSearch()
    const [query, setQuery] = useState<string>('')
    const [serverError, setServerError] = useState('')

    const [searchMade, setSearchMade] = useState<boolean>(false) // Para mostrar a mensagem de erro caso a busca não retorne nada
    const [apiData, setApiData] = useState([]) // Para mostrar a mensagem de erro caso a busca não retorne nada
    //const { apiData, fetchData, setApiData, isLoading, serverError } = useFetch()

    async function handleSearch(event: FormEvent<HTMLFormElement>) {
        setIsLoading(true)
        event.preventDefault()
        setApiData([])
        setSearchMade(true)
        await api.get(`/get/orders/cpf/${sanitizeCPF(query)}`)
            .then(response => {
                setApiData(response.data)
            })
            .catch(error => {
                setServerError(error.response.data.message)
            })
            .finally(() => setIsLoading(false))

    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <Label htmlFor="cpf">CPF</Label>
                <Fieldset>
                    <Input
                        required
                        id="cpf"
                        variant="search"
                        name="cpf"
                        type="text"
                        value={query}
                        onChange={e => setQuery(formatCPF(e.target.value))}
                        maxLength={14}
                        placeholder="Ex: 123.456.789-00"
                    />
                    <Button type="submit" variant="search">
                        <Search size="20" color="#71717a" />
                    </Button>
                </Fieldset>
            </form>

            {/* {isLoading && <Loader />} */}
            {/* {serverError && <p>Ocorreu um erro: {serverError}</p>} */}

            {apiData.length > 0 ? ( // Se a busca foi feita e retornou dados, mostra a tabela caso contrário segue para o próximo ternário
                <Table data={apiData} />
            ) : (searchMade && !isLoading) ? ( // Se a busca foi feita e terminou de carregar, mas não retornou dados, mostra a mensagem de erro
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem 0',
                        border: '1px solid #e4e4e7',
                        borderRadius: '0.5rem',
                    }}
                >
                    <p style={{ textAlign: 'center', color: '#71717a', fontSize: 14 }}>
                        {serverError !== null ? serverError : "Nenhum resultado encontrado."}
                    </p>
                </div>
            ) : null}
        </div>
    )
}