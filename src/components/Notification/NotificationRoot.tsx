import { ReactNode } from 'react'
import styled from 'styled-components'

const Root = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    width: 100%;

    :hover {
        background-color: #f3f4f6;
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
    }
`
interface NotificationRootProps {
    children: ReactNode
}
export function NotificationRoot({ children }: NotificationRootProps) {
    return (
        <Root>{children}</Root>
    )
}