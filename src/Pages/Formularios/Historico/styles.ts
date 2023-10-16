import styled from "styled-components";

export const Container = styled.div`
  width: 40.625rem;
  height: 100%;

  > div {
    display: flex;
    //margin: 0.625rem 0 1.875rem 0;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
      button{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        padding: 0 1rem;
        border-radius: 0 0.625rem 0.625rem 0;
        border: none;
        
      }
        .check {
          justify-content: flex-end;
          padding: 0.625rem 1rem;
          margin-left: 0.625rem;
          gap: 0.25rem;

          font-weight: 600;
          color: #fff;
          background-color: #10b981;
          border-radius: 0.625rem;
          border: 1px solid #10b981;
          
          transition: all 0.25s ease;
          :hover {
            background-color: #10b981;
            opacity: 0.9;
            color: #fff;
          }
          
        }

`;

export const ContainerChat = styled.div`
  display: flexbox;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  gap: 0.5rem;
  margin: 1rem 0 2rem 0;
`

export const ContainerMessages = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 0.625rem;
  padding: 1rem;
`


export const Message = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 80%;
  overflow-wrap: break-word;
  margin-bottom: 1rem;

  > :nth-child(1), > :nth-child(3) {
    font-size: 0.875rem;
    color: #666;
    margin-left: 0.25rem;
  }
  > :nth-child(2) {
    width: auto;
    padding: 1rem 0.5rem;
    margin: 1px 0;
    background-color: #d4d4d8;//#d5d5d5;
    border-radius: 0.625rem;
    border: 1px solid #a1a1aa;
    transition: all 0.25s ease;

    :hover {
      background-color: #e4e4e7;
    }
  }
  `

const Span = styled.span`
color: #f00;
font-size: 1.125rem;
font-weight: 600;
margin-left: 0.25rem;
`