import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 100vh;
    width: auto;
`;

export const ContainerImage = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6rem;

    img {
        width: 212px;
        height: 152px;
    }
`;

export const SignInForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin-top: 5rem;

    span {
        font-size: 1.25rem;
        font-weight: 600;
        font-family: 'Roboto', sans-serif;
        line-height: 160%;
    }

    form {
        display: flex;
        width: 300px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;

        input {
            width: 100%;
            height: 3.5rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1rem;
            font-family: 'Roboto', sans-serif;

            ::placeholder {
                font-size: 1rem;
                font-family: 'Roboto', sans-serif;
                padding-left: 1rem;
            }
        }

        button {
            width: 100%;
            height: 3.5rem;
            border: 1px solid #007bff;
            border-radius: 5px;
            background-color: #007bff;
            color: #fff;
            font-size: 1rem;
            font-weight: 500;
            font-family: 'Roboto', sans-serif;
            cursor: pointer;
            transition: 0.3s;

            &:hover {
                background-color: #0056b3;
            }

            &:disabled {
                background-color: #3b82f6;
                cursor: not-allowed;
            }
        }
    }
`;

