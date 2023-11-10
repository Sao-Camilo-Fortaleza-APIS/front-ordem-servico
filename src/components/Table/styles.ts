import styled from "styled-components";

export const Container = styled.div`
  max-height: 15rem;
  overflow-y: scroll;
  border-radius: 0.5rem;
  border: 1px solid #e4e4e7;
  padding: 0.25rem;

  /* Estilo da barra de rolagem */
    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    /* Estilo do polegar da barra de rolagem */
    &::-webkit-scrollbar-thumb {
        background: #71717a; 
        border-radius: 0.75rem; 
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #52525b;
    }

    /* Estilo da faixa de trilha da barra de rolagem */
    &::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 0.75rem;
    }
`
export const Tr = styled.tr`
  border-bottom: 1px solid #e4e4e7;

`;
export const Th = styled.th`
  border-bottom: 1px solid #e4e4e7;
  font-weight: 500;
  text-align: left;
`;

export const Td = styled.td`
  border-bottom: 1px solid #e4e4e7;
  text-align: left;
  padding: 0.5rem;
`;

