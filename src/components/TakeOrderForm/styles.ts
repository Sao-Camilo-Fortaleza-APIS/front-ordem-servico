import styled from "styled-components";

export const FormStyled = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  width: 100%;
  height: 100%;
  border-top: 1px solid #d1d5db;
  padding-top: 1rem;

  button {
    padding: 0.5rem 1rem;
    width: 100%;
    font-size: 1rem;
  }
`;