import styled from "styled-components";

export const ButtonStyled = styled.button<{ variant?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  font-size: 1rem;
  line-height: 1;
  font-weight: 500;
  background-color: ${props => props.variant === 'search-icon' ? '#ce2929' : '#fff'};
  color: #000;
  cursor: pointer;
  transition: all 0.25s ease;
  position: ${props => props.variant === 'search-icon' ? 'absolute' : 'relative'};
  right: ${props => props.variant === 'search-icon' ? '-4rem' : ''};
  top: ${props => props.variant === 'search-icon' ? '4rem' : ''};
	border: ${props => props.variant === 'search-icon' ? 'none' : '#71717a 1px solid'};
  border-radius: ${props => props.variant === 'search-icon' ? '9999px' : '0 0.5rem 0.5rem 0'};
	
  :hover {
		background-color: ${props => props.variant === 'search-icon' ? '#ef4444' : '#e4e4e7'};
		border: ${props => props.variant === 'search-icon' ? 'none' : '#71717a 1px solid'};
	}

  :focus {
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border-radius: 0 0.5rem 0.5rem 0;
	}

  /* link */
  ${props => props.variant === 'link' && `
    margin-top: 0.5rem;
    background-color: #e4e4e7;
    color: #000;
    border: transparent 1px solid;
    padding: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.25s ease;
    :hover {
      opacity: 0.9;
    }
  `}
`;