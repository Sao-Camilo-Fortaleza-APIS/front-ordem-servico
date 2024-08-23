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
margin-bottom: 0.5rem;
`;

export const Th = styled.th`
  border-bottom: 1px solid #e4e4e7;
  font-weight: 500;
  text-align: center;
`;

export const Td = styled.td`
  border-bottom: 1px solid #e4e4e7;
  text-align: center;
  padding: 0.5rem 0.75rem;

  .badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #ffffff;
    border-radius: 12px;
    text-transform: uppercase;
  }
  
  .badge-closed {
    background-color: #fecaca;
    color: #ef4444;
  }

  .badge-open {
      background-color: #a7f3d0;
      color: #10b981;
  }
`;

