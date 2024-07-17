import * as SwitchPrimitive from '@radix-ui/react-switch';
import styled from "styled-components";

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 5rem;
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
    align-items: center;

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

  .switch-item {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: start;
  }

  .switch-item:has(#close:disabled) {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const SwitchThumb = styled(SwitchPrimitive.Thumb)`
    display: block;
    width: 26px;
    height: 26px;
    background-color: white;
    border-radius: 9999px;
    transition: transform 100ms;
    transform: translateX(2px);
    will-change: transform;
    
    &[data-state='checked'] {
         transform: translateX(18px);
    };
`

export const SwitchRoot = styled(SwitchPrimitive.Root)`
    display: flex;
    width: 48px;
    height: 31px;
    align-items: center;
    justify-content: space-between;
    background-color: #f2f2f2;
    border-radius: 9999px;
    transition: background-color 0.3s ease;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    border: 1px solid #d1d5db;

    &[data-state='checked'] {
        background-color: #10b981;
    }
`