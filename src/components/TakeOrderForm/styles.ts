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
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
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

		#takeon-button {
			background: #10b981; 
			color: #fff;
			border: 1px solid #10b981;
			box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);			

			:hover {
				background: #059669;
				border: 1px solid #059669;
			}
		}

		#transfer-button {
			background: #3b82f6;
			color: #fff;
			border: 1px solid #3b82f6;
			box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

			:hover {
				background: #2563eb;
				border: 1px solid #2563eb;
			}
		}

		@media (max-width: 600px) {
			flex-direction: column;
				#takeon-button {
					width: 100%;
					font-size: 1rem;
					padding: 1rem 0;
				}
				#transfer-button {
					font-size: 1rem;
					padding: 1rem 0;
					width: 100%;
				}
		}
	}

	.confirm-transfer {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.5rem;
	}

	 .select-group {
		width: 100%;
		font-weight: 500;
		font-size: 1rem;
		color: #71717A;
		border: 1px solid #d4d4d8;
		border-radius: 4px;
	}

	#confirm-or-cancel {
		margin-top: 0.5rem;
		display: flex;
		gap: 0.5rem;

		#confirm-button {
			background: #3b82f6; 
			color: #fff;
			border: 1px solid #3b82f6;
			box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

			:hover {
				background: #2563eb;
				border: 1px solid #2563eb;
			}
		}

		#cancel-button{
			background: transparent;
			text-decoration: underline;
			box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

			:hover {
				background: #d4d4d8;
				color: #71717A;
			}

		}

		// colocar media screen para mobile
		@media (max-width: 600px) {
			flex-direction: column;
			#confirm-button {
				width: 100%;
				font-size: 1rem;
			}
			#cancel-button {
				font-size: 1rem;
				width: 100%;
			}
		}
	}
`;