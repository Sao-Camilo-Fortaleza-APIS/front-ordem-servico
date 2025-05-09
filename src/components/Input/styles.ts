import styled from "styled-components";

export const InputStyled = styled.input<{ variant: string }>`
  min-height: 2.25rem;
	/* margin: 0.5rem 0; */
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.variant === 'search' ? ' 0.5rem 0 0 0.5rem' : '0.5rem'};
  padding: 0 0.5rem;
  font-size: 1rem;
  line-height: 1;
  color: #3f3f46;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: #71717a 1px solid;
  border-right: ${props => props.variant === 'search' && 'none'};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  ::placeholder {
    color: #a1a1aa;
    font-family: 'Roboto', sans-serif;
  }

	:focus {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border-radius: ${props => props.variant === 'search' ? ' 0.5rem 0 0 0.5rem' : '0.5rem'};
  }
`;