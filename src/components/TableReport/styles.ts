
import styled from "styled-components";

/* export const TableContainer = styled('div')(({ theme }) => ({
  overflowX: 'auto',
  overflowY: 'auto',
  maxHeight: '80vh',
  width: '100%',
  maxWidth: '90vw',
})); */

export const TableContainer = styled.div`
  overflow-y: auto;
  max-height: 50vh;
  width: 100%;
  max-width: 90vw;
`

export const Table = styled.table`
  width: 100%;
  min-width: 500px;
  border-collapse: collapse;
  overflow-y: scroll;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  margin-top: 1rem;

  caption {
    color: #a1a1aa;
    text-align: right;
    margin-bottom: 0.25rem; 
    margin-right: 0.5rem;

    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }
`;

export const TableHeader = styled.thead`
    background-color: #f3f4f6;
`;

export const TableRow = styled.tr`
  transition: background-color 0.25s ease;
  &:nth-child(even) {
    background-color: #f9fafb;
  }

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 0.5rem;
  text-align: left;
  font-weight: bold;
  font-family: 'Roboto', 'Trebuchet MS', sans-serif;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.4rem;
    word-break: break-word;
  }
`;

export const TableCell = styled.td`
  padding: 0.5rem;
  font-family: 'Roboto', 'Trebuchet MS', sans-serif;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.4rem;
    word-break: break-word;
  }
`;