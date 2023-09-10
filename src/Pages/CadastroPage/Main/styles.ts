import styled from "styled-components";

export const Botoes = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    button{
        padding: 1rem;
        height: 80px;
        width:900px;
        font-size:  large;
        background: linear-gradient(to right, #F72525, #FF3939);
            color: #FFFFFF;
            border-radius: 5px;
            outline: none;
            font-weight: 800;
            cursor: pointer;
            transition: all 300ms ease;
            border:none;
            :hover{
            background: linear-gradient(to right, #FF5F5F, #FF5A5A);
            border-color: none;
            border: none;
            color: #FFFFFF;
        }
    }
`