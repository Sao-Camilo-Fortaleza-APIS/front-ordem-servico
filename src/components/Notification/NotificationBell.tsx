import { BellDot } from "lucide-react"

interface NotificationBellProps {
    unreadCount: number
    onClick: () => void
}

export const NotificationBell = ({ unreadCount, onClick }: NotificationBellProps) => {

    return (
        <div onClick={onClick} style={{ cursor: 'pointer', position: 'relative' }}>
            <BellDot />
            {unreadCount > 0 && (
                <span style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "0.75rem"
                }}>
                    {unreadCount}
                </span>
            )}
        </div>
    )
}