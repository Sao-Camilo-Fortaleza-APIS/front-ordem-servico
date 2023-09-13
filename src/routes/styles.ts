import styled from "styled-components";

export const CardForm = styled.div`
/*     margin-top: 1rem; */
    width: 650px;
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
    border-radius: 10px;
    #titulo{
        /* border-radius: 10px 10px 0px 0px; */
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
            font-family: 'Quicksand', sans-serif;
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
            width: 100%;
            margin-top: 1rem;
            height: 40px;
            border-radius:10px 10px 0px 0px ;
            ::placeholder{
                font-size: medium;
            }
            font-size: smaller;
        }
        
    }
`
export const Aviso = styled.div`
    margin-top: 1rem;
    color: red;
    font-size: small;
`

export const NmItem = styled.div`
    background: white;
    border-radius: 10px;
    padding: 1rem;
    margin-top: 10px;
    box-shadow: 0px 10px 40px -12px #00000056;
    b{
        color: red;
    }
    input{
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
            font-family: 'Quicksand', sans-serif;
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
    #valores{
        margin-top: 1rem;
        display: flex;
        gap: 8rem;
        justify-content: center;
        div{
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        p{
            margin-top: 6px;
            margin-left: 10px;
        }
        input{
            width: 20px;
            height: 20px;
            :hover{
                cursor: pointer;
            }
        }
    }
    @media (max-width:600px){
        height:auto ;
        input{
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
            width: 100%;
            height: 40px;
            font-size: medium;
        }
        #valores{
            gap: 3rem;
            p{
            margin-top: 1rem;
            margin-left: 6px;
         }
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
            font-family: 'Quicksand', sans-serif;
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
    margin-top: 1rem;
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
    #voltar{
            background: linear-gradient(to right, #EE2929, #E00404);
            color: #FFFFFF;
            border-radius: 5px;
            outline: none;
            font-weight: 800;
            cursor: pointer;
            transition: all 300ms ease;
            border:none;
            :hover{
            background: linear-gradient(to right, #EE7272, #FF4F4F);
            border-color: none;
            border: none;
            color: #FFFFFF;
        }
    }
    @media (max-width:600px){
        button{
            width: 90%;
            height: 60px;
            font-size: large;
        }
    }
`
