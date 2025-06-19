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
/**
 * Uma constante com as sequências dos grupos de trabalho da TI (exceto Plantão Sobreaviso - 54)
 * @returns number[]
 */
export const IT_WORKGROUPS_SEQUENCES = [21, 22, 26, 28, 29, 32, 33, 34, 35, 36, 39, 43, 44, 45]
