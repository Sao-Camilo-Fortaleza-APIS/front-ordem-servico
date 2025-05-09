import styled from "styled-components";

export const CardForm = styled.div`
/*     margin-top: 1rem; */
    width: 40.625rem;
    height: 100%;
    @media (max-width:600px){
        width: 95%;
        height: 100%;
        h2{
            font-size: medium;
        }
    }
`

export const InputContainer = styled.div`
    background: white;
    border-radius: 0.625rem;
    #titulo{
        border-radius: 10px 10px 0px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #CE2929;
        color: white;
    }
    @media (max-width:600px){
        #titulo{
            padding: 7px;
        }
    }
`
export const Solicitante = styled.div`
    padding: 1rem;

    b{
        color: #FF0000;
    }
    input{
        font-family: 'Roboto', sans-serif;

        margin-top: 04px;
        background: none;
        width: 90%;
        padding: 0.5rem;
        border: solid;
        border-width: 0;
        border-bottom-width: 1px;
        border-color: #CE2929;
        transition: all 300ms;
        :hover{
            border-bottom-width: 2px;
            border-bottom-color: #FF0000;
            
        }
        :focus{
            display: inline-block;
            cursor: pointer;
            outline: 0; 
            border: 0;
            border-radius: 0;
            font-size: 1em;
            color: black;
            font-family: 'Roboto', sans-serif;
            border:2px solid #FF0000;
            border-left-width: 0;
            border-top-width: 0;
            border-right-width: 0;
            border-radius: 5px;
            position: relative;
            transition: all 0.25s ease;

        }

    }
    @media (max-width:600px){
        height:auto;
        input{
            font-family: 'Roboto', sans-serif;
            width: 100%;
            margin-top: 1rem;
            height: 40px;
            border-radius:10px 10px 0px 0px ;
            font-size: smaller;
            ::placeholder{
                font-size: medium;
            }
        }
        
    }
`
export const Aviso = styled.div`
    margin-top: 1rem;
    color: red;
    font-size: small;
`

export const DivItems = styled.div`
    display: flex; 
    gap: 0.625rem; 
    align-items: center;
    justify-content: space-between;
`;

export const NmItem = styled.div`
    background: #fff;
    font-family: 'Roboto', 'Inter', sans-serif;
    color: #27272a;
    font-weight: 400;
    font-size: 1.125rem;
    border-radius: 0.625rem;
    padding: 1rem;
    margin-top: 0.625rem;
   /*  box-shadow: 0px 0.625rem 2.5rem -0.75rem #00000056; */
    b{
        color: #FF0000;
    }
    span {
        font-family: 'Inter', 'Roboto', sans-serif;
        font-weight: 500;
    }
    input{
        font-family: 'Roboto', sans-serif;
        margin-top: 0.25rem;
        background: none;
        width: 90%;
        padding: 0.5rem;
        border: solid;
        border-width: 0;
        border-bottom-width: 1px;
        border-color: #d4d4d8;
        transition: all 300ms;
        :hover{
            border-bottom-width: 2px;
            border-bottom-color: #FF0000;    
        }
        :focus{
            display: inline-block;
            cursor: pointer;
            outline: 0; 
            border: 0;
            border-radius: 0;
            font-size: 1em;
            color: black;
            font-family: 'Roboto', sans-serif;
            border:2px solid #FF0000;
            border-left-width: 0;
            border-top-width: 0;
            border-right-width: 0;
            border-radius: 5px;
            position: relative;
            transition: all 0.25s ease;
        }
    }

    textarea {
        font-family: 'Roboto', sans-serif;
        margin-top: 0.25rem;
        background: none;
        width: 90%;
        height: 100px;
        resize: none;
        padding: 0.5rem;
        border: solid;
        border-width: 0;
        border-bottom-width: 1px;
        border-color: #d4d4d8;
        transition: all 300ms;
        :hover{
            border-bottom-width: 2px;
            border-bottom-color: #FF0000;
        }
        :focus{
            display: inline-block;
            cursor: pointer;
            outline: 1px solid #e3e3e4; 
            border: 1px solid #e3e3e4;
            border-color: #e3e3e4;
            border-radius: 0;
            font-size: 1em;
            color: black;
            font-family: 'Roboto', sans-serif;
            border:2px solid #FF0000;
            border-left-width: 0;
            border-top-width: 0;
            border-right-width: 0;
            border-radius: 5px;
            position: relative;
            transition: all 0.25s ease;
        }
    }

    select{
        font-family: 'Roboto', sans-serif;
        border-radius: 5px;
        margin-top: 10px;
        width: 90%;
        padding: 4px;
        transition: all 0.25s ease;
        :hover{
            background: #EBEBEB;
            cursor: pointer;
        }
    }
    
    #valores {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 8rem;

        label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            :hover {
                cursor: pointer;
            }

            input{
                font-family: 'Roboto', sans-serif;
                width: 20px;
                height: 20px;
            }
        }
    }
        @media (max-width:600px){
        height:auto ;
        input{
            font-family: 'Roboto', sans-serif;
            width: 100%;
            margin-top: 1rem;
            height: 40px;
            border-radius:10px 10px 0px 0px ;
            ::placeholder{
                font-size: medium;
            }
            font-size: smaller;
        }
        select{
            font-family: 'Roboto', sans-serif;
            width: 100%;
            height: 40px;
            font-size: medium;
        }
        #valores label {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`

export const NmItemNumero = styled.div`
    background: white;
    border-radius: 10px;
    padding: 1rem;
    margin-top: 10px;
    box-shadow: 0px 10px 40px -12px #00000056;
    b{
        color: red;
    }
    input{
        font-family: 'Roboto', sans-serif;
        margin-top: 04px;
        background: none;
        width: 90%;
        padding: 0.5rem;
        border: solid;
        border-width: 0;
        border-bottom-width: 1px;
        border-color: #d4d4d8;
        transition: all 300ms;
        :hover{
            border-bottom-width: 2px;
            border-bottom-color: #FF0000;
            
        }
        :focus{
            display: inline-block;
            cursor: pointer;
            outline: 0; 
            border: 0;
            border-radius: 0;
            font-size: 1em;
            color: black;
            font-family: 'Roboto', sans-serif;
            border:2px solid #FF0000;
            border-left-width: 0;
            border-top-width: 0;
            border-right-width: 0;
            border-radius: 5px;
            position: relative;
            transition: all 0.25s ease;

        }
    }
    select{
        font-family: 'Roboto', sans-serif;
        border-radius: 5px;
        margin-top: 10px;
        width: 90%;
        padding: 4px;
        transition: all 0.25s ease;
        :hover{
            background: #EBEBEB;
        }
    }
    @media (max-width:600px){
        height:160px ;
        input{
            font-family: 'Roboto', sans-serif;
            width: 100%;
            margin-top: 1rem;
            height: 40px;
            border-radius:10px 10px 0px 0px ;
            ::placeholder{
                font-size: medium;
            }
            font-size: smaller;
        }
        select{
            font-family: 'Roboto', sans-serif;
            width: 100%;
            height: 40px;
            font-size: medium;
        }
    }
`

export const Box = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: none;
    gap: 6px;
    margin-left: 1rem;
    margin-top: 1rem;
    @media (max-width:600px){
        p{
            margin-top: 12px;
        }
    }
`

export const Radios = styled.div`
    background: white;
    padding: 1rem;
    border-radius: 10px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 10px 40px -12px #00000056;
    b{
        color: red;
    }
    div{
        display: flex;
        p{
            margin-left: 10px;
            margin-top: 10px;
        }   
        input{
            font-family: 'Roboto', sans-serif;
            margin-top: 10px;
            width: 20px;
            height: 20px;
            :hover{
                cursor: pointer;
            }
        }
    }

`

export const Btns = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 2rem;
    button{
        font-family: 'Inter','Roboto', sans-serif;
        padding: 20px;
        width: 400px;
        font-size: 18px;
        font-weight: 500;
    }
    button:disabled,
    button[disabled] {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .enviar{
            width: 100%;
            background-color: #ce2929;
            color: #FFFFFF;
            border-radius: 0.75rem;
            outline: none;
            cursor: pointer;
            transition: all 300ms ease;
            border:none;
            :hover{
            background-color: #dc2626;
            border-color: none;
            border: none;
            color: #FFFFFF;
        }
    }
    .danger{
            width: 100%;
            background-color: #EE2929;
            color: #FFFFFF;
            border-radius: 0.75rem;
            outline: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 300ms ease;
            border:none;
            :hover{
            background-color: #dc2626;
            border-color: none;
            border: none;
            color: #FFFFFF;
        }
    }
    .check {
          width: 100%;
          font-weight: 500;
          color: #fff;
          background-color: #10b981;
          border-radius: 0.75rem;
          border: 1px solid #10b981;  
          transition: all 0.25s ease;
          :hover {
            background-color: #059669;
            color: #fff;
          }
        }
    @media (max-width:600px){
        button{
            width: 90%;
            height: 60px;
            font-size: 16px;
        }
    }
`
