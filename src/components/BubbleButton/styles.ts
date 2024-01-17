import styled from "styled-components";

export const StyledButton = styled.button`  
  padding: 0.25rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: 500;
  line-height: 1.25;
  color: #27272a;
  transition: color 0.2s ease, background-color 0.2s ease;
  border-radius: 0.25rem;
  border: 1px solid #718096;
  background-color: #d4d4d8;

  &:hover {
    color: #3f3f46;
    background-color: #a1a1aa;
  }

  &[data-active='true'] {
    color: #2563eb;
  }
`;