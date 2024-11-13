import styled from "styled-components";

export const OrderDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    font-size: 0.875rem;
    color: #9ca3af;
    gap: 0.5rem;
    background-color: #fff;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 1rem;
    h4 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #71717a;
        text-align: left;
        white-space: normal;
        overflow: hidden;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 0.1rem;
        overflow: hidden;
        font-size: 1rem;

         .infos {
             font-size: 1rem;
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
    }
`