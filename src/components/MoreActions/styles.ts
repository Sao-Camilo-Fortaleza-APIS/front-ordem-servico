import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components';

type TriggerButtonProps = {
  colorScheme?: 'gray' | 'red' | 'blue';
}

export const TriggerButton = styled.button<TriggerButtonProps>`
  padding: 0.5rem;
  border-radius: 0.625rem;
  transition: all 0.3s;
  background: transparent;;
  border: 1px solid 
    ${({ colorScheme }) => {
    switch (colorScheme) {
      case 'red':
        return '#dc2626';
      case 'blue':
        return '#2563eb';
      case 'gray':
        return '#d4d4d8';
      default:
        return '#007bff';
    }
  }};
  color: ${({ colorScheme }) => {
    switch (colorScheme) {
      case 'red':
        return '#dc2626';
      case 'blue':
        return '#2563eb';
      case 'gray':
        return '#a1a1aa';
      default:
        return '#007bff';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  min-width: 2.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  cursor: pointer;
  
  &:hover {
   background-color: ${({ colorScheme }) => {
    switch (colorScheme) {
      case 'red':
        return '#fee2e2';
      case 'blue':
        return '#eff6ff';
      case 'gray':
        return '#f3f4f6';
      default:
        return '#f3f4f6';
    }
  }};
    cursor: pointer;
  }
  
  &:disabled {
  border: 1px solid #ccc;
    background-color: #ccc;
    color: #a1a1aa;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    border-radius: 0.5rem;
    border: 1px solid 
    ${({ colorScheme }) => {
    switch (colorScheme) {
      case 'red':
        return '#dc2626';
      case 'blue':
        return '#2563eb';
      case 'gray':
        return '#d4d4d8';
      default:
        return '#007bff';
    }
  }};
  color: ${({ colorScheme }) => {
    switch (colorScheme) {
      case 'red':
        return '#dc2626';
      case 'blue':
        return '#2563eb';
      case 'gray':
        return '#a1a1aa';
      default:
        return '#007bff';
    }
  }};

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const Content = styled(DropdownMenu.Content)`
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  width: 13.75rem;
  z-index: 30;
`;

export const Item = styled(DropdownMenu.Item)`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #71717A;
  border-radius: 0.375rem;
  cursor: pointer;
  gap: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background-color: #f4f4f5;
  }

  &:focus {
    outline: none;
    background-color: #e4e4e7;
  }

  &:disabled {
    background-color: #f4f4f5;
    color: #a1a1aa;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.4rem 0.5rem;
    height: 100%;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;
