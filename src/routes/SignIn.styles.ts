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
        font-size: 1rem;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 0 1rem;

        input {
            width: 300px;
            height: 3.5rem;
            border: 1px solid #ccc;
            margin: 0 1rem;
            border-radius: 5px;
            font-size: 1rem;
            font-family: 'Roboto', sans-serif;
        }

        button {
            width: 300px;
            height: 3.5rem;
            border: none;
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
        }
    }
`;

