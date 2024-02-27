import styled from "styled-components";

export const Container = styled.div`
    width: 40.625rem;
    height: 100%;
    @media (max-width:600px){
        width: 95%;
        height: 100%;
        h2{
            font-size: medium;
        }
    }
    @media (max-width: 360px) {
        padding: 0 1rem;
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

          font-weight: 500;
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

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.5rem;

  /* para alinhar button com icone de pesquisa */
  position: relative;

  @media (max-width: 600px){
    .content-mobile {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

export const ContainerChat = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  gap: 0.5rem;
  margin: 0 0 2rem 0;
`

export const HeaderOrder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0 1rem;
  height: 2rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  background-color: #ce2929;
  color: white;

  .number-and-title {
    max-width: 100%;
    width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .requester {
    max-width: min-content;
    width: 30%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media (max-width: 600px) {
    display: flex;
    height: fit-content;
    width: 80vw;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    gap: 0.5rem;

    .number-and-title {
      display: flex;
      flex-direction: row;
      align-items: start;
      gap: 0.5rem;
      width: 100%;

      strong{
        font-weight: normal;
        ::before {
          content: 'Nº ';
        }
      }

      span {
        font-size: 0.875rem;
        color: #fff;

        ::before {
          content: '| ';
        }
      }
    }
      
    .requester {
      width: auto;
      font-size: 0.875rem;

     /*  ::before {
        content: 'Solicitante: ';
      } */
    }
  }

`;

export const ContainerMessages = styled.div`
  background-color: #fff;
  width: 100%;
  height: 55vh;
  overflow-y: scroll;
  border-radius: 0.75rem;
  padding: 1rem;

  /* Estilo da barra de rolagem */
    &::-webkit-scrollbar {
        width: 0.75rem;
    }

    /* Estilo do polegar da barra de rolagem */
    &::-webkit-scrollbar-thumb {
        background: #71717a; 
        border-radius: 0.75rem; 
    }

    /* Estilo da faixa de trilha da barra de rolagem */
    &::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 0.75rem;
    }

  /* ajustar img de histórico vazio*/
  > .div-image {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  > .div-image .image {
    width: 16rem;
    height: 16rem;
    border-radius: 50%;
  }

  > .div-image span {
    font-weight: 500;
    color: #a1a1aa;
    width: 70%;
    text-align: center;
    line-height: 1.5;
  }
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

    span img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      border-radius: 0.375rem;
    }

    :hover {
      background-color: #e4e4e7;
    }
  }
`

export const Form = styled.form`
display: flex;
flex-direction: column;
gap: 0.75rem 0;

  .action-form {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: end;
  }
`;

export const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  height: 5rem;
  border-radius: 0.5rem;
  
  ::placeholder {
    color: #a1a1aa;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
  }
`;