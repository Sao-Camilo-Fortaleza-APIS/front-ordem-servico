import styled from "styled-components";

export const Ok = styled.div`
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: fit-content;
    width: 100%;
    border-radius: 5px;
    padding-top: 2rem;
    border-radius: 0.625rem;
    margin-top: 0.625rem;
    div{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    h3{
        font-weight: 400;
        padding-top: 0.5rem;
        
        >span{
            font-weight: 700;
        }
    }
    img{
        margin: 4rem 0;
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    //margin: 2rem 0;
    button{
        padding: 20px;
        width: 400px;
        font-size: large; 
        }
        #enviar{
            background: linear-gradient(to right, #2412c7, #4ab6f5);
            color: #FFFFFF;
            border-radius: 5px;
            outline: none;
            font-weight: 700;
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