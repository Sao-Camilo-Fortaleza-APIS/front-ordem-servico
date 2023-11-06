import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Loader } from '../Load'
import { configToastError } from '../../utils/toast-config'
import { toast } from 'react-toastify'
import Table from '../Table'

export default function SearchComponent() {
    const [query, setQuery] = useState<string>('')
    const { apiData, fetchData, isLoading, serverError } = useFetch()

    const handleSearch = (e: any) => {
        e.preventDefault()
        fetchData(`/get/order_user/${query}`)
    }


    return (
        <div>
            <form action="">
                <input
                    type="text"
                    placeholder="Pesquise por usuário"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type='submit' onClick={handleSearch}>Pesquisar</button>
            </form>

            {isLoading && <Loader />}
            {/* {serverError && <p>Ocorreu um erro: {serverError}</p>} */}

            {apiData && apiData.length > 0 && <Table data={apiData} />}
        </div>
    )
}