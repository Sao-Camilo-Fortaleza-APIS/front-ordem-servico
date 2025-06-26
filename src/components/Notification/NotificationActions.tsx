import { ReactNode } from 'react'

interface NotificationActionsProps {
    children: ReactNode
}

export function NotificationActions({ children }: NotificationActionsProps) {
    return (
        <div style={{ display: 'flex', gap: '0.5rem', alignSelf: 'center' }}>
            {children}
        </div>
    )
}