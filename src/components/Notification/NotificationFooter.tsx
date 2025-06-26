import styled from "styled-components"

const Footer = styled.div`
    display: flex;
    align-items: cetner;
    gap: 0.5rem;
    font-size: 0.625rem;
    color: #52525b;
`

interface NotificationFooterProps {
    text?: string
    time: string
}

export function NotificationFooter({ text, time }: NotificationFooterProps) {
    return (
        <Footer>
            <span>{time}</span>
            <span>{text}</span>
        </Footer>
    )
}