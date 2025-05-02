import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    margin: 0.25rem 0;
    width: 100%;
`;

export const DialogContent = styled(Dialog.Overlay)`
    overflow: scroll;
    width: 100vw;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    padding: 1rem; 
    height: 100vh; 
    background-color: #f4f4f5; 
    z-index: 10;
    min-width: 320px;
    border-left: 1px solid #4b5563;
`;

export const DialogTitle = styled(Dialog.Title)`
    font-size: 1.5rem;
    font-weight: 600;
    color: #71717a;
    margin-bottom: 0.5rem;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const DialogDescription = styled(Dialog.Description)`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    font-size: 0.875rem;
    color: #9ca3af;
    gap: 0.5rem;

    div:first-child {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 0.1rem;
        overflow: hidden;

        .title {
            font-size: 1rem;
            font-weight: 600;
            color: #71717a;
            text-align: left;
            white-space: normal;
            overflow: hidden;
        }

        .infos {
             font-size: 0.875rem;
            display: flex;
            align-items: center;
            justify-content: start;
            gap: 0.125rem;
            color: #a1a1aa;
            span{
                text-align: left;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .badge{
          border-radius: 0.5rem;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: #fff;
          background-color: #6b7280;
          margin-top: 0.5rem;
        }
    }
`;

export const OrderDetails = styled.div<{ color: string }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    
    background-color: #f4f4f5;
    border: none;
    border-radius: 0.313rem;
    border-left: 0.5rem solid;
    border-left-color: ${props => props.color};

    cursor: pointer;

    div:first-child {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 0.1rem;
        overflow: hidden;

        .title {
            font-size: 1rem;
            font-weight: 600;
            color: #71717a;
            text-align: left;
            white-space: normal;
            overflow: hidden;
        }

        .infos {
             font-size: 0.875rem;
            display: flex;
            align-items: center;
            justify-content: start;
            gap: 0.125rem;
            color: #a1a1aa;
            span{
                text-align: left;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .badge-yellow {
            border-radius: 0.5rem;
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
            font-weight: 500;
            color: #9a3412 ;
            background-color: #ffedd5;//#FFF9DB;
            margin-top: 0.5rem;
            border: 1px solid #fbbf24;
        }

        .badge-blue {
            border-radius: 0.5rem;
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
            font-weight: 500;
            color: #1E40AF ;
            background-color: #DBEAFE;
            margin-top: 0.5rem;
            border: 1px solid #3b82f6;
        }
    }
    div.icon {
        margin-left: 0.5rem;
    }
    // media queries smarthphone medium
    @media (max-width: 426px) {
        width: 100%;
        padding: 0.5rem 0.5rem;
        div {
            .title {
                font-size: 0.875rem;
                font-weight: 400;
            }
            .infos span{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        div.icon {
            margin-left: 0.5rem;
            margin-right: 0;

        }
    }
`