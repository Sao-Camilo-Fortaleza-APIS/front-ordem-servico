import styled, { keyframes } from "styled-components";
import * as Dialog from '@radix-ui/react-dialog';

export const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  } 
`;

export const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DialogContent = styled(Dialog.Content)`
  background-color: #fff;
  border-radius: 0.625rem;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 1.75rem;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  :focus {
    outline: none;
  }
`;

export const DialogTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: 500;
  color: #000;
  font-size: 1.25rem;
`;

export const DialogDescription = styled(Dialog.Description)`
  margin: 0.625rem 0 1.25rem;
  color: #000;
  font-size: 0.875rem;
	font-weight: 400;
  line-height: 1.5;
`;

export const Flex = styled.div`
  display: flex; 
  justify-content: flex-end;
  margin-top: 1.25rem;
`;

export const Button = styled.button<props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.313rem;
  padding: 0 1rem;
  font-size: 1rem;
  line-height: 1;
  font-weight: 500;
  height: 2.25rem;
  background-color: #e4e4e7;
  color: #000;
	outline: none;
	cursor: pointer;
	border: #e4e4e7 1px solid;
	

  :hover {
		background-color: #fafafa;
		border: #e4e4e7 2px solid;
	}

	:focus {
		box-shadow: 0 0 0 2px #000;
	}

	${props => props.variant === 'search' && `
		border-radius: 0.313rem 0 0 0.313rem;
		
	`}
`;

export const IconButton = styled.button`
	all: unset;
	cursor: pointer;
	font-family: inherit;
  border-radius: 100%;
  height: 1.5rem;
  width: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #000;
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;

	:hover {
		background-color: #e4e4e7;
	}
	:focus {
		box-shadow: 0 0 0 2px #000;
	}
`;


export const Fieldset = styled.fieldset`
  all: unset;
  display: flex;
  gap: 1.25rem;
  align-items: center;
	justify-content: center;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
	color: #000;
	font-size: 0.875rem;
	font-weight: 400;
	line-height: 1.5;
`;

export const Input = styled.input`
	width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.313rem;
  padding: 0 0.5rem;
	margin: 1rem 0;
  font-size: 1rem;
  line-height: 1;
  color: #000;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  height: 2.25rem;

	:focus {
  box-shadow: 0 0 0 2px #000;
}

`;

