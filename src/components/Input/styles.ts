import styled from "styled-components";

export const Element = styled.input`
  width: 100%;
  /* height: 2.25rem; */
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.313rem;
  /* padding: 0 0.5rem; */
	/* margin: 0.5rem 0; */
  font-size: 1rem;
  line-height: 1;
  color: #000;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: #E4E4E7 1px solid;

	:focus {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

`;