import styled from "styled-components";

export const ContainerTabelas =styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    background: #7C7C7C;
    #btn{
        height: 30px;
        width: 60px;
        background: #005AC7;
        color: #ffffff;
        font-weight: 600;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 300ms ease-in-out;
        :hover{
            background: #139BEA;
        }
    }
    input[type="text"] {
        border: none;
        width: 95%;
        height: 90%;
        outline: none;
        text-align: center;
        :focus{
            border: 3px solid;
            border-color: #0054BB;
            border-radius: 5px;
        }
    }
    table {
        position: relative;
        width: auto;
        height: 45px;

    }
    thead {
    position: sticky;
    top: 0;
    left: 0;
    }
    tbody {
        overflow-y: scroll;
    }

    #titulo{
        background: #CBCBCB;
        font-size: medium;
        margin: 0;
        text-align: center;
    }
    #valor{
        text-align: center;
        
    }
    
`

export const Margem =styled.div`
    padding: 7rem;
`