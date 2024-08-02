import styled from "styled-components";

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin: 1rem 0;
  width: 100%;
  height: 100%;
  border-top: 1px solid #d1d5db;
  padding-top: 1rem;

  button {
    padding: 0.5rem 1rem;

    font-size: 1rem;
  }

  .confirm-transfer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;