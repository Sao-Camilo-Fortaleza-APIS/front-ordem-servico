import { Bell } from "lucide-react"

interface NotificationBellProps {
    unreadCount: number
}

export const NotificationBell = ({ unreadCount }: NotificationBellProps) => {

    return (
        <div style={{ cursor: 'pointer', position: 'relative' }}>
            <Bell />
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