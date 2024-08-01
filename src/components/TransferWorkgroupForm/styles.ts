import styled from "styled-components";

export const FormStyled = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border-top: 1px solid #d1d5db;
    padding-top: 1rem;

    .content-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  .action-form {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`