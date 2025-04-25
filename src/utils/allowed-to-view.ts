import { useSearch } from "../contexts/SearchContext"

/**
 * Verifica se o usuário tem permissão para visualizar um item de acordo com o grupo de planejamento (28 => TIC)
 * @returns boolean
 */
export const isAllowedToviewItem = () => {
    const { resultOrderData } = useSearch()

    if (resultOrderData?.group_planej === 28) {
        return true
    }
    return false
}