import * as Dialog from '@radix-ui/react-dialog';
import styled from "styled-components";

export const Overlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  z-index: 50;
`;

export const Content = styled(Dialog.Content)`
  background: white;
  border-radius: 8px;
  padding: 0.5rem 2rem 2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  z-index: 50;
`;

export const Label = styled.label`
  font-weight: bold;
 margin: 1.5rem 0 0.25rem 0;
 font-family: 'Roboto', 'Trebuchet MS', sans-serif;
 color: #71717A;

 span {
  font-weight: normal;
 }
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #d4d4d8;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  width: 100%;
  cursor:pointer;
  font-family: 'Roboto', 'Trebuchet MS', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: #71717A;

  
  :focus {
    outline: 2px solid #007bff;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 0.5rem;
  margin: 0.5rem 0 1rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  font-family: 'Roboto', 'Trebuchet MS', sans-serif;
  font-size: 0.875rem;
  color: #71717A;

  :focus {
    outline: 2px solid #007bff;
  }

  ::placeholder {
    color: #CCC;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  transition: all 0.2s ease-in-out;

  &:hover {
	background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
  }

  &:focus {
    outline: 2px solid #007bff;
  }
  
  &.cancel {
	background-color: #ccc;
	color: black;

    &:hover {
      background-color: #999;
    }
  }

`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #71717A;
`;