import { AxiosError } from "axios"
import { toast } from "react-toastify"
import api from "../services/api"
import { configToastError, configToastSuccess } from "../utils/toast-config"

type UseApprobationParams = {
    userApprobation: string
    satisfactionSelected: string
    setOpenFormReply: (value: boolean) => void
    setOpenPreApprove: (value: boolean) => void
    setUserApprobation: (value: string) => void
    handleSearch: (orderNumber: number) => void
}

export function useApprobation({
    userApprobation,
    satisfactionSelected,
    setOpenFormReply,
    setOpenPreApprove,
    setUserApprobation,
    handleSearch
}: UseApprobationParams) {
    const handleApprobation = async (hasApprove: 'yes' | 'not', orderNumber: number) => {
        if (hasApprove === 'not') {
            try {
                const response = await api.post('/post/approbation', {
                    nr_order: `${orderNumber}`,
                    has_approve: `${hasApprove}`
                })
                if (response?.status === 201) {
                    setOpenFormReply(true)
                    toast.success('Ordem de Serviço Reprovada!', configToastSuccess)
                }
                handleSearch(orderNumber)
            } catch {
                toast.error('Houve um erro inesperado. Tente novamente mais tarde.', configToastError)
            }
        } else if (hasApprove === 'yes') {
            try {
                await api.post('/post/rating', {
                    order: orderNumber,
                    rating: satisfactionSelected
                })

                const response = await api.post('/post/approbation', {
                    nr_order: `${orderNumber}`,
                    has_approve: `${hasApprove}`,
                    nm_usuario: `${userApprobation}`
                })

                if (response?.status === 201) {
                    setOpenPreApprove(false)
                    setUserApprobation('')
                    toast.success('Ordem de Serviço Aprovada!', configToastSuccess)
                }
                handleSearch(orderNumber)
            } catch (error: AxiosError<any> | any) {
                if (error?.response?.status === 400) {
                    toast.error('Informe o Usuário do Tasy. Exemplo: nome.sobrenome', configToastError)
                } else if (error?.response?.status === 404) {
                    toast.error('Usuário não encontrado. Tente novamente.', configToastError)
                } else {
                    toast.error('Houve um erro inesperado. Tente novamente mais tarde.', configToastError)
                }
            }
        }
    }

    return { handleApprobation }
}
