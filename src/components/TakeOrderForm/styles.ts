import styled from "styled-components";

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  border-top: 1px solid #d1d5db;
  padding-top: 1rem;

  .content-form {
    display: flex;
    flex-direction: column;
    justify-content: end;
  }

  .action-form {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`;