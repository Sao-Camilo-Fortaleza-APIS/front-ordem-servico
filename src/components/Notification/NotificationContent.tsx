import { HTMLAttributes, ReactNode } from "react"
import styled from "styled-components"

const ContainerContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: start;
    gap: 0.25rem;
`
const Paragraph = styled.p`
    font-size: 0.875rem; /* 14px */
    line-height: 1.625;
    color: #52525b;
    // quebrar linhas 
    white-space: pre-wrap;
    word-break: break-word;
`

interface NotificationContentProps extends HTMLAttributes<HTMLParagraphElement> {
    text: string
    children: ReactNode
}

export function NotificationContent({ text, children, ...rest }: NotificationContentProps) {
    return (
        <ContainerContent>
            <Paragraph {...rest} >{text}</Paragraph>

            {children}
        </ContainerContent>
    )
}