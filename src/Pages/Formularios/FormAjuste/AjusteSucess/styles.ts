import styled from "styled-components";

export const Ok = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: 100%;
    margin-top: 1rem;
    width: 70%;
    div{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    h3{
        font-weight: 300;
    }
    img{
        margin-top: 3rem;
    }
    @media (max-width: 600px) {
       width: 96%;
       h1{
        text-align: center;
       }
       h3{
        margin-top: 1rem;
        text-align: center;
       }
       p{
        text-align: center;
        margin: 3px;
       }

    }
`

export const BotaoAjuste = styled.div`
    margin-top: 4rem;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 3rem;
    margin-bottom: 1rem;
    button{
        padding: 20px;
        width: 400px;
        margin-bottom: 8rem;
        font-size: large;
       
        }
        #enviar{
            background: linear-gradient(to right, #2412c7, #4ab6f5);
            color: #FFFFFF;
            border-radius: 5px;
            outline: none;
            font-weight: 800;
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
    @media (max-width: 600px) {
        button{
            width: 100%;
        }
    }
`