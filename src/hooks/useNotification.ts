import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { socket } from "../services/socket";

interface Notification {
    id: number | string;
    orderId: string;
    message: string;
    timestamp: string;
    seen: boolean;
}

export const useNotification = (userId: number | string) => {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [unreadCount, setUnreadCount] = useState(0)
    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        socketRef.current = socket
        socket.connect()
        socket.emit("register_user", { user_id: userId })

        socket.on("new_notification", (notification: Notification) => {
            setNotifications((prev) => [notification, ...prev])
            setUnreadCount((prev) => prev + 1)
        })

        /* return () => {
            socket.disconnect()
        } */
    }, [userId])

    const markAsSeen = async (notificationId: number | string) => {
        setNotifications((prev) =>
            prev.map((n) => n.id === notificationId ? { ...n, seen: true } : n)
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
    }

    return { notifications, unreadCount, markAsSeen }
}