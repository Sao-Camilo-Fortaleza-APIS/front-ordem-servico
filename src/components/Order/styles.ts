import * as Accordion from '@radix-ui/react-accordion';
import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    margin-bottom: 0.5rem;
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
    padding: 0 1rem;
`;