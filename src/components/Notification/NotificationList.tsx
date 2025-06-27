import { CheckCheck, MessageCircleMore, RotateCcw } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Notification as INotification, useNotification } from "../../hooks/useNotification"
import { formatStartDate } from "../../utils/convert-date"
import { Notification } from './'

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const HeaderTitle = styled.span`
    font-weight: bold;
    color: #374151;
`
const HeaderButton = styled.button`
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: bold;
  color: #9ca3af;
  background-color: transparent;
  border: none;

  &:hover {
    color: #6b7280;
    cursor: pointer;
  }
`;
const Section = styled.section`
    max-height: 400px;
    overflow-y: scroll;
    border: 1px solid #d1d5db;
    border-left: none;
    border-right: none;
    border-radius: 0;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    padding: 0.5rem 0;

    ::-webkit-scrollbar {
        width: 0.375rem;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #a1a1aa;
        border-radius: 20px;
        border: 3px solid #a1a1aa;

        :hover {
            background-color: #71717A;
            border: 3px solid #71717A;
        }
    }
`
const Footer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.25rem;
    margin-top: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    `
const FooterButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.25rem;
    text-transform: uppercase;
    background-color: transparent;
    border: none;
    color: #2563eb;

    &:hover {
    color: #3b82f6;
    cursor: pointer;
    }
    :disabled {
        color: #a1a1aa;
        cursor: not-allowed;
    }
`

export const NotificationList = ({ executor }: { executor: string }) => {
    const { notifications, markAsSeen, refetch, markAllAsSeen } = useNotification(executor)
    const [isLoading, setIsloading] = useState(false)
    const navigate = useNavigate()

    const handleMarkAsSeen = async (notificationId: number[], orderId: number) => {
        setIsloading(true)
        markAsSeen(notificationId)
            .then(() => refetch())
            .finally(() => setIsloading(false))
    }

    const stripHtml = (htmlString: string): string => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(htmlString, "text/html")
        return (doc.body.textContent) || ""
    }


    return (
        <>
            <Header>
                <HeaderTitle>Notificações não lidas</HeaderTitle>
                <HeaderButton onClick={() => refetch()}><RotateCcw /></HeaderButton>
            </Header>

            <Section>
                {notifications?.length > 0
                    ? (notifications?.map((n: INotification) => (
                        <Notification.Root key={n.nr_seq_notificacao}>
                            <Notification.Icon icon={MessageCircleMore} className={isLoading ? `animate-pulse` : ''} />
                            <Notification.Content text={`Novo histórico ${n?.ds_remetente} na OS ${n?.nr_ordem}`} className={isLoading ? `animate-pulse` : ''}>
                                <span style={{ fontSize: '14px' }}>{stripHtml(n.ds_mensagem).slice(0, 20) + "..."}</span>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <Notification.Footer time={formatStartDate(n.dt_mensagem)} />

                                    <Notification.Actions>
                                        <Notification.Action
                                            text="Ver histórico"
                                            onClick={() => {
                                                navigate(`/ordem/${n?.nr_ordem}`)
                                                handleMarkAsSeen([n.nr_seq_notificacao], n.nr_ordem)
                                            }}
                                            disabled={isLoading}
                                        />

                                        <Notification.Action
                                            text="Marcar como lido"
                                            onClick={() => handleMarkAsSeen([n.nr_seq_notificacao], n.nr_ordem)}
                                            disabled={isLoading}
                                        />
                                    </Notification.Actions>
                                </div>
                            </Notification.Content>

                        </Notification.Root>
                    )))
                    : (<p>Sem notificações novas</p>)}
            </Section>

            <Footer>
                <FooterButton onClick={() => markAllAsSeen()} disabled={notifications?.length < 1 && true}>
                    <CheckCheck size={20} /> MARCAR TODAS COMO LIDAS
                </FooterButton>
            </Footer>
        </>
    )
}