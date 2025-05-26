import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin-top: 7.5rem;
    height: 100%;
    width: auto;
`;

export const ContainerImage = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    /* img {
        width: 10rem;
    } */
`;

export const SignInForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    width: 100%;

    span {
        font-size: 1.25rem;
        font-weight: 600;
        font-family: 'Roboto', sans-serif;
        line-height: 160%;
        color: #3F3F46;
    }

    form {
        display: flex;
        width: 360px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;

        input {
            width: 100%;
            height: 3.5rem;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            padding-left: 1rem;
            font-family: 'Roboto', sans-serif;
            margin-bottom: 0.75rem;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

            ::placeholder {
                font-size: 0.875rem;
                font-family: 'Roboto', sans-serif;
            }
        }
        span {
            color: #ff0000;
            font-size: 0.875rem;
            font-family: 'Roboto', sans-serif;
            line-height: 1.25rem;
            font-weight: 400;
        }

        button {
            width: 100%;
            height: 3.5rem;
            border: 1px solid #ce2929;
            border-radius: 6px;
            background-color: #ce2929;
            color: #fff;
            font-size: 1rem;
            font-weight: 500;
            font-family: 'Roboto', sans-serif;
            cursor: pointer;
            transition: 0.3s;

            &:hover {
                filter: brightness(95%);
                background-color: #ce2929;
            }

            &:disabled {
                border: 1px solid #f87171;
                background-color: #f87171;
                cursor: not-allowed;
            }
        }
    }

    .animate-spin {
        animation: spin 1s linear infinite;

        @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
        }
    }
`;

