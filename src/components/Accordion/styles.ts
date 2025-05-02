import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import styled, { keyframes } from "styled-components";

export const StyledRoot = styled(AccordionPrimitive.Root)`
  display: flex;
  border-radius: 0.5rem;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);  
`;

export const StyledItem = styled(AccordionPrimitive.Item)`
  border-radius: 0.5rem;
  overflow: hidden;

  &:focus-within {
    position: relative;
    z-index: 1;
    box-shadow: 0 0 0 1px #000;
  }
`;

export const StyledHeader = styled(AccordionPrimitive.Header)`
  all: unset;
  display: flex;
`;

export const StyledTrigger = styled(AccordionPrimitive.Trigger)`
  all: unset;
  display: grid;
  grid-template-columns: 1fr auto;
  height: 2.5rem;
  width: 100%;
  font-family: inherit;
  justify-content: space-between;
  align-items: center;
  gap: 0 1rem;
  padding: 0 1rem;
  font-size: 0.875rem;
  line-height: 1;
  color: #fff;
  box-shadow: 0 1px 0 #E7E7E7;
  background-color: #ce2929;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
 
  .number-and-title {
    font-size: 1rem;   
    overflow: hidden;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    gap: 0.25rem;
  }

   .number-and-title :first-child {
    font-weight: 500;
   }

  @media (max-width: 600px) {
    display: flex;
    height: fit-content;
    width: 80vw;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    gap: 0.5rem;
/* 
    .number-and-title {
      display: flex;
      flex-direction: row;
      align-items: start;
      gap: 0.5rem;
      width: 100%;
    }
      
    .requester {
      width: auto;
      font-size: 0.875rem;
    } */
  }
`
export const StyledChevron = styled(ChevronDownIcon)`
  color: #e8e6e3;
  transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
  &[data-state='open'] {
    transform: rotate(180deg);
  }
`;

export const slideDown = keyframes`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`;

export const slideUp = keyframes`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`;

export const StyledContent = styled(AccordionPrimitive.Content)`
  overflow: hidden;
  font-size: 0.875rem;
  color: #fff;
  background-color: #f4f4f5;

  &:hover {
     filter: brightness(1.1);
  }

  &[data-state='open'] {
    animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
  &[data-state='closed'] {
    animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
`;

export const StyledContentText = styled.div`
  padding: 1rem 1rem;

    div:first-child {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 0.25rem;
        overflow: hidden;

        .title {
            font-size: 1rem;
            font-weight: 500;
            color: #6b7280;
            text-align: left;
            white-space: normal;
            overflow: hidden;
        }

        .infos {
             font-size: 0.875rem;
            display: flex;
            align-items: center;
            justify-content: start;
            gap: 0.25rem;
            color: #6b7280;
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

        }
    }

  /* div:first-child :nth-child(2) {
    margin-bottom: 0.75rem;
    background-color: #f3f4;
  } */
`;