import styled from "styled-components";

export const StyledButton = styled.button`  
  padding: 0.5rem; /* You may need to adjust this based on your design */
  font-size: 0.875rem; /* Corresponds to text-sm in Tailwind */
  display: flex;
  align-items: center;
  gap: 0.375rem; /* Corresponds to gap-1.5 in Tailwind */
  font-weight: 500; /* Corresponds to font-medium in Tailwind */
  line-height: 1.25; /* Corresponds to leading-none in Tailwind */
  color: #718096; /* Corresponds to text-zinc-200 in Tailwind */
  transition: color 0.2s ease, background-color 0.2s ease; /* Transition for hover effect */

  &:hover {
    color: #edf2f7; /* Corresponds to hover:text-zinc-50 in Tailwind */
    background-color: #4a5568; /* Corresponds to hover:bg-zinc-600 in Tailwind */
  }

  &[data-active='true'] {
    color: #8b5cf6; /* Corresponds to data-[active=true]:text-violet-400 in Tailwind */
  }
`;