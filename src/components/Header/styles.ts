import styled from "styled-components"

export const HeaderContainer = styled.header`
    display: flex;
    background: white;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    width: 40.625rem;
    margin-top: 1rem;
    div{
        img{
            border-radius: 10px;
        }
    }
    @media (max-width:600px){
        margin-top: 0;
        width: 100%;
        height: 140px;
    }
`

export const Logo = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width:600px){
        width: 300px;
    }
`
export const ImageBanner = styled.div`
    margin: 0;
    height: 200px;
    width: 900px;
    border-radius: 5px;
    background: url("/assets/hospital_resized.jpg") no-repeat;
    @media (max-width:600px){
        display: none;
    }
`
