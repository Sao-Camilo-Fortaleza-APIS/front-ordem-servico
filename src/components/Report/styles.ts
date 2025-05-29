import * as Dialog from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';

export const Overlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  z-index: 50;
`;

export const Title = styled(Dialog.Title)`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
  font-family: 'Roboto', 'Trebuchet MS', sans-serif;

  @media (max-width: 480px) {
    font-size: 1.2rem;
    text-align: center;
  }
`;

export const Content = styled(Dialog.Content)`
  background: white;
  border-radius: 8px;
  padding: 0.5rem 2rem 2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: start;
  z-index: 50;

  &:focus {
    outline: none;
  }

  /* Estilo da barra de rolagem */
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  /* Estilo do polegar da barra de rolagem */
  &::-webkit-scrollbar-thumb {
    background: #71717a; 
    border-radius: 0.75rem; 
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #52525b;
  }
  /* Estilo da faixa de trilha da barra de rolagem */
  &::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    max-height: 95vh;
    max-width: 95vw;
    border-radius: 12px;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  margin: 1rem 0 0.25rem 0;
  font-family: 'Roboto', 'Trebuchet MS', sans-serif;
  color: #71717A;

  span {
    font-weight: normal;
  }
`;

export const Input = styled.input`
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
  height: 2.5rem;

  :focus {
    outline: 2px solid #007bff;
  }

  :disabled {
    cursor: not-allowed;
    background-color: #e4e4e7;
  }

  ::placeholder {
    color: #CCC;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 5rem;
  min-height: 5rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
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

export const DivRow = styled.div`
  display: flex;
  align-items: end;
  justify-content: start;
  flex-direction: row;
  gap: 1rem;
  margin: 0 0.25rem;
`;

export const DivColumn = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  width:100%;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

type ButtonProps = {
  colorScheme?: 'gray' | 'red' | 'blue';
}
export const Button = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ colorScheme }) => {
    switch (colorScheme) {
      case 'red':
        return '#dc2626';
      case 'blue':
        return '#2563eb';
      case 'gray':
        return '#6b7280';
      default:
        return '#007bff';
    }
  }};
  color: white;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: all 0.2s ease-in-out;
  justify-self: flex-end;
  height: 2.5rem;
  font-family: 'Roboto', 'Trebuchet MS', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:0.5rem;
  margin-top: 0.5rem;
  line-height: 1.5rem;
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.75rem;
    font-size: 1rem;
  }

  &:hover {
	  background-color: ${({ colorScheme }) => (colorScheme === 'red' ? '#b91c1c' : '#0056b3')};
  }

  &:disabled {
    background-color: #ccc;
  }

  &:focus {
    outline: 2px solid ${({ colorScheme }) => (colorScheme === 'red' ? '#dc2626' : '#007bff')};
  }
  
  &.cancel {
    background-color: #ccc;
    color: #18181b;

      &:hover {
        background-color: #999;
      }
  }

  &.icon {
    background-color: transparent;
    border: none;
    color: #2563eb;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.25s ease-in-out;

    &:hover {
      color: #0056b3;
      background-color: #dbeafe;
      outline: 1px solid #0056b3;
    }

    &:focus {
      outline: 2px solid #0056b3;
      background-color: #dbeafe;
    }

  }

  &.check {
    color: #10b981;
  
    &:hover {
      color: #059669;
      background-color: #d1fae5;
      outline: 1px solid #059669;
    }

    &:focus {
      outline: 2px solid #059669;
      background-color: #d1fae5;
    }
  }

  &.ghost {
    background-color: transparent;
    color: #18181b;

    padding: 0.5rem;

    &:hover {
      background-color: #f0f0f0;
      color: #18181b;
    }
  }

  &.danger {
    color: #dc2626;
    transition: all 0.25s ease-in-out;

    &:hover {
      color: #dc2626;
      background-color: #fef2f2;
      outline: 1px solid #dc2626;
    }

    &:focus {
      outline: 2px solid #dc2626;
      background-color: #fef2f2;
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
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 1.25rem;
    right: 0.5rem;
    top: 0.5rem;
  }
`;

export const ConfirmContainer = styled.div<{ bgColor?: string, borderColor?: string }>`
  background: ${({ bgColor }) => bgColor ? bgColor : '#fef2f2'};
  border: 1px solid ${({ borderColor }) => borderColor ? borderColor : '#fecaca'};
  padding: 0.75rem 1rem 0.5rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CancelBtn = styled.button`
  background: #f3f4f6;
  border: none;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #d4d4d8;
  margin-right: 0.5rem;
  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }
`

export const ConfirmBtn = styled.button`
  background: #dc2626;
  border: none;
  color: white;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #b91c1c;
  }
`

// Animação fade + slide
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  } to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  } to {
    opacity: 0;
    transform: translateY(20px);
  }
`

export const AnimatedBlock = styled.div<{ visible: boolean }>`
  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 0.3s ease;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  transition: all 0.3s ease;
`;