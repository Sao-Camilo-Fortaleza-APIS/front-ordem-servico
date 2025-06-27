import { ToastContentProps } from "react-toastify";

type MsgNotificationProps = ToastContentProps<{ title: string; content: string; orderId: number, onClick?: () => void }>;

export function Msg({ data: { content, orderId, title, onClick } }: MsgNotificationProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <h3 style={{ fontSize: '0.875rem', lineHeight: 'calc(1.25 / 0.875)', fontWeight: '600', color: '#27272a' }}>{title}</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 'calc(1.25 / 0.875)', fontWeight: '600' }}>{content}</p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <a
                    href={`/ordem/${orderId}`}
                    style={{
                        width: 'max-content',
                        marginLeft: 'auto',
                        transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                        border: '1px', borderRadius: '0.375rem',
                        padding: '8px 16px', backgroundColor: 'transparent',
                        color: '#2563EB',
                        display: 'flex',
                        gap: '0.25rem'
                    }}>
                    Ver histórico
                </a>
            </div>
        </div>
    )
}