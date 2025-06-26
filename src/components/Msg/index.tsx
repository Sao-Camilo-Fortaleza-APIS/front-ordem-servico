import { ArrowRight } from "lucide-react";
import { ToastContentProps } from "react-toastify";

type MsgNotificationProps = ToastContentProps<{ title: string; content: string; }>

export function Msg({ closeToast, data }: MsgNotificationProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <h3 style={{ fontSize: '0.875rem', lineHeight: 'calc(1.25 / 0.875)', fontWeight: '600', color: '#27272a' }}>{data?.title}</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 'calc(1.25 / 0.875)', fontWeight: '600' }}>{data?.content}</p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <button
                    onClick={closeToast}
                    style={{
                        width: 'max-content',
                        marginLeft: 'auto',
                        transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                        border: '1px', borderRadius: '0.375rem',
                        padding: '8px 16px', color: 'white',
                        backgroundColor: '#2563EB',
                        display: 'flex',
                        gap: '0.25rem'
                    }}>
                    Ir <ArrowRight size={16} />
                </button>
            </div>
        </div>
    )
}