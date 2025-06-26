import { ElementType, HTMLAttributes } from 'react'

interface NotificationIconProps extends HTMLAttributes<HTMLElement> {
    icon: ElementType
}
export function NotificationIcon({ icon: Icon }: NotificationIconProps) {
    return <Icon style={{
        height: '1.5rem',
        width: '1.5rem',
        color: '#9ca3af'
    }} />
}