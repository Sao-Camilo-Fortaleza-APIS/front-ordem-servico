import * as SwitchPrimitive from '@radix-ui/react-switch';
import styled from "styled-components";

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;

   @media (max-width: 375px) {
    gap:0.25rem;
    width: 100%;
   }

  .comment-container {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    background-color: #fff;
    padding: 0.5rem;
    border-radius: 0.75rem;
    border: 1px solid #d4d4d8;
    max-width: 100%;
    transition: border 0.2s ease-in-out;

    :focus-within {
      border: 1px solid #60a5fa;
    }

    textarea {
      resize: none;
      width: 100%;
      font-family: 'Roboto', sans-serif;
      font-size: 1rem;
      line-height: 1;
      padding: 0.25rem;
      height: 5rem;
      border-radius: 0.5rem;
      color: #71717a;
      border: none; //1px solid #d4d4d8;
      
      ::placeholder {
        color: #a1a1aa;
        font-family: 'Roboto', sans-serif;
        font-size: 0.875rem;
      }
      :focus{
        outline: none;
        border: none;
      }

      @media (max-width: 375px) {
        font-size: 0.875rem;
      }
    }
  }

  .action-form{
    display: grid;
    gap: 8px;

    &.with-yellow {
      grid-template-areas:
        "green"
        "bottom-row";
      grid-template-columns: 1fr;
    }

    &.no-yellow {
      grid-template-areas: "green red";
      grid-template-columns: 1fr auto;
      align-items: center;
    }

    @media (max-width: 319px) {
      &.no-yellow {
        grid-template-areas:
          "green"
          "red";
        grid-template-columns: 1fr min-content;
        gap: 0.5rem;
      }

      .yellow-red-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .switch-item {
        width: 100%;
        justify-content: space-between;
      }

      :where([data-radix-popper-content-wrapper]) {
        justify-self: start;
      }
    }

    .radio-group {
      grid-area: green;
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      align-items: center;
      padding: 0.25rem;
      font-size: 0.875rem;
    
      .radio-item {
        display: flex; 
        flex-direction: row;
        align-items: center; 
        justify-content: start;
        gap: 0.25rem;

        input {
          width: 1.5rem;
          height: 1.5rem;
          cursor: pointer;
        }
      }
    }

    .yellow-red-row {
      grid-area: bottom-row;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .switch-item {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: center;
      justify-content: start;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      padding: 0.25rem;
      width: fit-content;

      @media (max-width: 375px) {
      label {
        font-size: 0.875rem;
      }
    }
    }

    .switch-item:has(#close:disabled) {
      opacity: 0.5;
      pointer-events: none;
    }

    :where([data-radix-popper-content-wrapper]) {
      grid-area: red;
      justify-self: end;
    }

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
    border: 1px solid #d1d5db;
    
    &[data-state='checked'] {
         transform: translateX(18px);
    };
`

export const SwitchRoot = styled(SwitchPrimitive.Root)`
    display: flex;
    width: 49px;
    height: 32px;
    align-items: center;
    justify-content: space-between;
    background-color: #f2f2f2;
    border-radius: 9999px;
    transition: background-color 0.3s ease;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    border: 1px solid #9ca3af;

    &[data-state='checked'] {
        background-color: #10b981;
        border: 1px solid #d1d5db;
    }
`