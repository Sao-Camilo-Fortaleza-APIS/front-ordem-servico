import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "../services/api";
import { queryClient } from "../services/react-query";

export interface Notification {
    ds_mensagem: string
    ds_remetente: string
    nr_ordem: number
    nr_seq_notificacao: number
    dt_mensagem: string
}

export const useNotification = (executor: number | string) => {

    const { data: notifications, isLoading, isFetching, refetch } = useQuery({
        queryKey: ["notifications", executor],
        queryFn: async () => {
            const response = await api.get(`/get/notifications/${executor}`)
            if (!(response?.status === 200)) {
                console.error(response)
                throw new Error(response?.data?.message)
            }
            return response?.data as Notification[]
        },
    })

    const markAsSeen = async (notificationIds: number[]) => {
        try {
            console.log("Entrou aí")
            const markAsSeenResponse = await api.put("/put/notifications/seen", {
                notification_id: notificationIds
            })

            queryClient.invalidateQueries({ queryKey: ["notifications", executor], refetchType: 'all' })

            console.log(markAsSeenResponse?.data?.message)
            return markAsSeenResponse?.data?.message
        } catch (error) {
            console.error("Erro ao marcar como lida", error)
            return (error as AxiosError).message
        }
    }

    const markAllAsSeen = async () => {
        const unseenIds = notifications?.map((n: Notification) => n.nr_seq_notificacao)
        console.log("unseenIds ->", unseenIds)
        try {
            const markAllAsSeenResponse = await api.put("/put/notifications/seen", {
                notification_id: unseenIds
            })

            refetch()
            console.log(markAllAsSeenResponse?.data)
        } catch (error) {
            return (error as AxiosError).message
        }
    }

    return { notifications, markAsSeen, refetch, isLoading, markAllAsSeen, isFetching }
}