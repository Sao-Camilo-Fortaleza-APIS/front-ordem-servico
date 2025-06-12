import { useNavigate } from "react-router-dom"
import { useNotification } from "../../hooks/useNotification"

export const NotificationList = ({ userId }: { userId: number | string }) => {
    const { notifications, markAsSeen } = useNotification(userId)
    const navigate = useNavigate()

    const handleClick = (notificationId: string | number, orderId: string) => {
        markAsSeen(notificationId)
        navigate(`/ordem/${orderId}`)
    }
    console.log("notifications", notifications)

    return (
        <div style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            maxWidth: "300px",
            background: "#fff"
        }}>
            <h4>Notificações</h4>
            {notifications.length === 0 ? (
                <p>Sem notificações novas</p>
            ) : (
                notifications.map((n: any) => (
                    <div
                        key={n.id}
                        style={{ background: n.seen ? '#f0f0f0' : '#fff', padding: '10px', cursor: 'pointer' }}
                        onClick={() => handleClick(n.id, n.orderId)}>
                        <strong>{n.message}</strong>
                        <div style={{ fontSize: "0.8rem", color: "#555" }}>
                            {new Date(n.timestamp).toLocaleString()}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}