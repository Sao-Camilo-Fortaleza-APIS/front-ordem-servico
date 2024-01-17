import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import Table from '../Table'
import { Input } from '../Input'
import { Fieldset } from '../Modal/styles'
import { Button } from '../Button'
import { Search } from 'lucide-react'
import { Label } from '../Label'

export function SearchByUser() {
    const [query, setQuery] = useState<string>('')
    const [searchMade, setSearchMade] = useState<boolean>(false) // Para mostrar a mensagem de erro caso a busca não retorne nada
    const { apiData, fetchData, setApiData, isLoading } = useFetch()

    const handleSearch = (e: any) => {
        e.preventDefault()
        setApiData([])
        setSearchMade(true)
        fetchData(`/get/order_user/${query}`)
    }

    return (
        <div>
            <form onSubmit={(event) => handleSearch(event)}>
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

            {apiData && apiData.length > 0 ? ( // Se a busca foi feita e retornou dados, mostra a tabela caso contrário segue para o próximo ternário
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
                        Usuário não encontrado. Verifique e tente novamente.
                    </p>
                </div>
            ) : null}
        </div>
    )
}