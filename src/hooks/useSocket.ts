import { useEffect, useRef, useState } from "react"
import { socket } from "../services/socket"

export const useSocket = ({ user }: { user: string }) => {
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const hasConnectedRef = useRef(false)

    useEffect(() => {
        if (!user || hasConnectedRef.current) {
            console.log("Usuário nã oreconhecio para o socket")
            return
        }

        socket.connect()
        hasConnectedRef.current = true

        const enterTheRoom = () => {
            console.log("➡️ Entranddo na sala:", user)
            socket.emit("enter_the_room", { user })
        }

        socket.on("connect", () => {
            console.log("✅ Socket conectado")
            setIsConnected(true)
            enterTheRoom()
        })

        socket.on("disconnect", () => {
            console.log("🔴 Socket Desconectado")
            setIsConnected(false)
        })

        return () => {
            socket.off("connect")
            socket.off("disconnect")
            socket.off()
            socket.disconnect()
            hasConnectedRef.current = false
        }
    }, [user])

    return {
        socket,
        isConnected
    }
}