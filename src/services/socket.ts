import { io } from "socket.io-client"
import type { TypedSocket } from "../utils/socket-types"
import api from "./api"

export const socket: TypedSocket = io(import.meta.env.VITE_BASE_URL, {
    autoConnect: false,
    reconnection: true,
})

export const fetchNotifications = async (userId: number | string) => {
    const res = await api.get(`notifications?userId=${userId}&seen=false`)
    return res.data
}

export const markNotificationAsSeen = async (notificationId: number | string) => {
    await api.patch(`notifications/${notificationId}`, { seen: true })
}