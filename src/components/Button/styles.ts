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
  position: ${props => props.variant === 'search-icon' ? 'absolute' : ''};
  right: ${props => props.variant === 'search-icon' ? '-4rem' : ''};
  top: ${props => props.variant === 'search-icon' ? '4rem' : ''};
	border: ${props => props.variant === 'search-icon' ? 'none' : '#71717a 1px solid'};
  border-radius: ${props => {
    switch (props.variant) {
      case 'search-icon':
        return '9999px';
      case 'search':
        return '0 0.5rem 0.5rem 0';
      default:
        return '0.5rem';
    }
  }};

  /* reply */
  ${props => props.variant === 'reply' && `
    font-weight: 500;
    color: #fff;
    background-color: #2563eb;
    border-radius: 0.625rem;
    border: 1px solid #2563eb;
  `}

  /* danger */
  ${props => props.variant === 'danger' && `
  font-weight: 500;
    color: #fff;
    background-color: #ee2929;
    border-radius: 0.625rem;
    border: 1px solid #ee2929;
    cursor: pointer;
  `}

  :hover {
		//background-color: ${props => props.variant === 'search-icon' ? '#ef4444' : '#e4e4e7'};
    background-color: ${props => {
    switch (props.variant) {
      case 'search-icon':
        return '#ef4444';
      case 'search':
        return '#e4e4e7';
      case 'reply':
        return '#1d4ed8';
      default:
        return '#e4e4e7';
    }
  }};
		border: ${props => props.variant === 'search-icon' ? 'none' : '#71717a 1px solid'};
	}

  :focus {
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border-radius: ${props => {
    switch (props.variant) {
      case 'search-icon':
        return '9999px';
      case 'search':
        return '0 0.5rem 0.5rem 0';
      default:
        return '0.5rem';
    }
  }}
	}
`;