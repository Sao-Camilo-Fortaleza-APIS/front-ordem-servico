import styled from "styled-components";

export const Element = styled.input`
  /* height: 2.25rem; */
	/* margin: 0.5rem 0; */
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem 0 0 0.5rem;
  padding: 0 0.5rem;
  font-size: 1rem;
  line-height: 1;
  color: #000;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: #71717a 1px solid;
  border-right: none;

  ::placeholder {
    color: #71717a;
    opacity: 0.5;
  }

	:focus {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border-radius: 0.5rem 0 0 0.5rem;
}

`;