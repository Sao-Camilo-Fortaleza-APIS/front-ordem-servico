import styled from "styled-components";

export const FormStyled = styled.form`
  width: 100%;
  display: flex; 
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  button {
      padding: 0.5rem 1rem;
      width: 100%;
      color: #71717A;
      font-weight: 600;
      background: #d4d4d8;
      border: 1px solid #d4d4d8;
      border-radius: 4px;
    }
   select {
    padding: 0.5rem 1rem;
   } 
   label{
    color: #71717A;
    font-weight: 600;

   }
   
  #takeon-transfer {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 0.5rem;
  }

  #select-group {
    width: 100%;
  }

  #confirm-close {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
  }
`;