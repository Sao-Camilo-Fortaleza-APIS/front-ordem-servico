import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Loader } from '../Load'
import { configToastError } from '../../utils/toast-config'
import { toast } from 'react-toastify'
import Table from '../Table'
import { Input } from '../Input'
import { Fieldset } from '../Modal/styles'
import { Button } from '../Button'
import { Search } from 'lucide-react'
import { Label } from '../Label'

export function SearchUserComponent() {
    const [query, setQuery] = useState<string>('')
    const { apiData, fetchData, isLoading, serverError } = useFetch()

    const handleSearch = (e: any) => {
        e.preventDefault()
        fetchData(`/get/order_user/${query}`)
    }


    return (
        <div>
            <form onSubmit={(event) => handleSearch(event)}>
                <Label htmlFor="user">Nome do usuário</Label>
                <Fieldset>
                    <Input
                        required
                        id="user"
                        variant="search"
                        name="user"
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Pesquise por usuário"
                    />
                    <Button type="submit" variant="search">
                        <Search size="20" color="#71717a" />
                    </Button>
                </Fieldset>
            </form>

            {isLoading && <Loader />}
            {/* {serverError && <p>Ocorreu um erro: {serverError}</p>} */}

            {apiData && apiData.length > 0 && <Table data={apiData} />}
        </div>
    )
}