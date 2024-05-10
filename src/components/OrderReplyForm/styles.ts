import styled from "styled-components";

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  border-top: 1px solid #d1d5db;
  padding-top: 1rem;

  textarea {
    resize: none;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-size: 0.875rem;
    line-height: 1;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    height: 8rem;
    border-radius: 0.5rem;
    
    ::placeholder {
      color: #a1a1aa;
      font-family: 'Roboto', sans-serif;
      font-size: 1rem;
    }
    :focus{
      outline: none;
      border: 1px solid #60a5fa;
    }
  }

  .action-form{
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`;

export const RadioItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: row;
  justify-content: end;

  input {
    width: 1rem;
    height: 1rem;
  }
`;