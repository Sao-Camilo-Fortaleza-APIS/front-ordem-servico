import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    margin: 0.5rem 0;
`;

export const DialogContent = styled(Dialog.Overlay)`
    right: 0;
    top: 0;
    bottom: 0;
    padding: 2.5rem; /* equivalente a p-10 do Tailwind */
    height: 100vh; /* equivalente a h-screen do Tailwind */
    min-width: 320px; /* equivalente a min-w-[320px] do Tailwind */
    z-index: 10;
    background-color: #1f2937; /* substitua pela cor zinc-950 do Tailwind */
    border-left: 1px solid #4b5563; /* substitua pela cor border-zinc-900 do Tailwind */
`;

export const DialogTitle = styled(Dialog.Title)`

`;

export const OrderDetails = styled.div<{ color: string }>`
    overflow: hidden;
    margin-top: 1rem;
    &:first-child {
        margin-top: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    } 
    background-color: #f4f4f5;
    display: flex;
    width: 100%;
    height: 5.5rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    border: none;
    border-radius: 0.313rem;
    border-left: 0.5rem solid;
    border-left-color: ${props => props.color};
    overflow: hidden;
    cursor: pointer;

    div {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 0.1rem;

        .title {
            font-size: 1rem;
            font-weight: 600;
            color: #71717a;
            text-align: left;
        }

        .infos {
            font-size: 0.875rem;
            display: flex;
            align-items: center;
            gap: 0.125rem;
            color: #a1a1aa;
            text-align: left;
        }
    }

    .icon {
        background-color: #fafafa;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        border-radius: 99990px; 
        > {
            background-color: ${props => props.color};
        }
    }
`