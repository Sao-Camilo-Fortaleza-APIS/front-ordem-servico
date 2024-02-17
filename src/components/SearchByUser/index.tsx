import { Search } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useSearch } from '../../contexts/SearchContext'
import api from '../../services/api'
import { Button } from '../Button'
import { Input } from '../Input'
import { Label } from '../Label'
import { Fieldset } from '../Modal/styles'
import Table from '../Table'

export function SearchByUser() {
    const { isLoading, setIsLoading } = useSearch()
    const [query, setQuery] = useState<string>('')
    const [serverError, setServerError] = useState('')

    const [searchMade, setSearchMade] = useState<boolean>(false) // Para mostrar a mensagem de erro caso a busca não retorne nada
    const [apiData, setApiData] = useState([]) // Para mostrar a mensagem de erro caso a busca não retorne nada
    //const { apiData, fetchData, setApiData, isLoading, serverError } = useFetch()

    async function handleSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setApiData([])
        setSearchMade(true)
        //        fetchData(`/get/order_user/${query}`)
        await api.get(`/get/order_user/${query}`).then(response => {
            setApiData(response.data)
            console.log("response", response);
        }).catch(error => {
            setServerError(error.response.data.message)
            console.log("error", error.response.data.message);
        })
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <Label htmlFor="user">Usuário do Tasy</Label>
                <Fieldset>
                    <Input
                        required
                        id="user"
                        variant="search"
                        name="user"
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Ex: nome.sobrenome"
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