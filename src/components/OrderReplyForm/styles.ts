import styled from "styled-components";

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  border-top: 1px solid #d1d5db;
  padding-top: 1rem;

  label{
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    color: #71717a;
  }

  textarea {
    resize: none;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-size: 1.125rem;
    line-height: 1;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    height: 12rem;
    border-radius: 0.5rem;
    color: #71717a;
    
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

  .radio-group {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;

    .radio-item {
      display: flex; 
      flex-direction: row;
      align-items: center; 
      justify-content: start;
      gap: 0.25rem;

      input {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
`;