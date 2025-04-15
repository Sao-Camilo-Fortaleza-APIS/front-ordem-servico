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
`;
