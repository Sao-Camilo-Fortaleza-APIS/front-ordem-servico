import styled from "styled-components";

export const ContainerMain = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

`

export const MainCard =styled.div`
    height: 100vh;
    width: 900px;
    background: white;
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2{
        color: #1D1D1D;
        margin-top: 1rem;
    }
    @media (max-width: 600px) {
        width: 98%;
        h2{
            text-align: center;
        }
    }
`

export const BtnsMain = styled.div`
    margin-top: 3rem;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    button{
        box-shadow: 0px 10px 40px -12px #00000056;
        padding: 1rem;
        height: 80px;
        width:800px;
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
        box-shadow: none;
        }
    }
    @media (max-width: 600px){
        button{
            width: 350px;
        }
    }
`