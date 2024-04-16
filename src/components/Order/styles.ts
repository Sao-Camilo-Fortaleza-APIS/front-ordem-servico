import * as Accordion from '@radix-ui/react-accordion';
import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
`;

export const AccordionItem = styled(Accordion.Item)`
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
`;


export const AccordionTrigger = styled(Accordion.Trigger)`
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
    border-left: 0.5rem solid #f59e0b;
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
            background-color: #f59e0b;
        }
    }
`

export const AccordionContent = styled(Accordion.Content)`
    &[data-state="open"] {
        display: flex;
        flex-direction: column;
        row-gap: 0.25rem;
        background-color: #f4f4f5;
        font-size: 0.875rem;
        color: #71717a;
        text-align: left;
        padding: 0.5rem 1rem;
        margin-left: 0.5rem;
        border-radius: 0.313rem;
        border-left: 5px solid #f59e0b;
        border-top: 1px solid #e1e1e6;
    }

    &[data-state="closed"] {
        display: none;
    }
`;