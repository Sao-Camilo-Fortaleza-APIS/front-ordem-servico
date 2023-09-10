import styled from "styled-components";

export const CardMain = styled.div`
    background: #fff;
    width: 660px;
    margin-top: 1rem;
    height: 300px;
    border-radius: 10px;
    #linha{
        border-radius: 10px 10px 0 0;
        background-color: #CA0909;
        width: 100%;
        height: 13px;
    }
    @media (max-width: 600px) {
        width: 100%;
        height: 350px;
    }
`

export const Topo =styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 1rem;
    h1{
        margin-bottom: 1.5rem;
    }
    @media (max-width: 600px) {
        h1{
            display: flex;
            text-align: center;
            font-size: x-large;
        }
    }
`

export const BtnProx = styled.div`
    margin-top: 4rem;
    button{
        padding: 1rem;
        height: 45px;
        width: 200px;
        font-weight: 800;
        background: linear-gradient(to right, #2412c7, #4ab6f5);
            color: #FFFFFF;
            border-radius: 5px;
            outline: none;
            font-weight: 400;
            cursor: pointer;
            transition: all 300ms ease;
            border:none;
            :hover{
            background: linear-gradient(to right, #4D40C0, #7DCAF7);
            border-color: none;
            border: none;
            color: #FFFFFF;
        }

    }
    @media (max-width: 600px){
        button{
            font-weight:800;
            font-size: large;
        }
    }

`