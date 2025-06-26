import { ButtonHTMLAttributes, ElementType } from "react"
import styled from "styled-components"

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    border: none;
    color: #2563eb;
    font-size: 0.75rem;
    background-color: transparent;
    :hover {
        color: #3b82f6;
        cursor: pointer;
        text-decoration: underline;
    }
`

interface NotificationActionProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: ElementType
    text?: string
}

export function NotificationAction({ icon: Icon, text, ...rest }: NotificationActionProps) {
    return (
        <Button {...rest} >
            {Icon && <Icon style={{ height: '1.25rem', width: '1.25rem', color: 'inherit', marginRight: '0.25rem' }} />}
            {text}
        </Button>
    )
}