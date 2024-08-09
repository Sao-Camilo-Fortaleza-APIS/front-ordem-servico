import styled from "styled-components";

export const FormStyled = styled.form`
	width: 100%;
	display: flex; 
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;

	button {
		padding: 0.5rem 1rem;
		width: 100%;
		color: #71717A;
		font-weight: 600;
		background: #d4d4d8;
		border: 1px solid #d4d4d8;
		border-radius: 4px;
		transition: 0.3s;

		:hover {
			background: #71717A;
			color: #fff;
		}
	}
	select {
		padding: 0.5rem 1rem;
		width: 100%;
	} 
	label{
		color: #71717A;
		font-weight: 600;

	}
   
	#takeon-transfer {
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: 0.5rem;
		padding: 1rem 2rem;
	}

	.confirm-transfer {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.5rem;
		padding: 1rem 2rem;
	}

	 .select-group {
		width: 100%;
		font-weight: 500;
		font-size: 1rem;
		color: #71717A;
		border: 1px solid #d4d4d8;
		border-radius: 4px;
	}

	#confirm-close {
		margin-top: 0.5rem;
		display: flex;
		gap: 0.5rem;
	}
`;