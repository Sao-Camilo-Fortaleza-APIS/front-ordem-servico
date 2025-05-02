import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components';

export const TriggerButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.625rem;
  background: transparent;
  transition: background 0.2s;
  border: 2px solid #d4d4d8;
  color: #a1a1aa;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e4e4e7;
    cursor: pointer;
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    border-radius: 0.5rem;
    border: 1px solid #d4d4d8;
    width: 2.5rem;
    height: 2.5rem;

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

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.4rem 0.5rem;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;
