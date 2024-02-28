import * as Accordion from '@radix-ui/react-accordion';
import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
export const AccordionTrigger = styled(Accordion.Trigger)`
    display: flex;
    width: 100%;
    height: 5.5rem;
    flex-direction: row;
    align-items: start;
    border-radius: 0.313rem;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border: none;
    border-left: 0.5rem solid #0EA5E9;
    overflow: hidden;
    cursor: pointer;
    background-color: #f4f4f5;

    div {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 0.1rem;
        width: 80%;
        /* background-color: #0EA5E9; */

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
        }
    }
        .icon-card {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 20%;
            
            :first-child {
                background-color: #0EA5E9;
            }
        }
`

export const AccordionContent = styled(Accordion.Content)`
    padding: 0 1rem;
`;