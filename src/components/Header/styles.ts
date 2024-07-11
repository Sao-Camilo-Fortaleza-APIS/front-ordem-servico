import styled from "styled-components"

export const HeaderContainer = styled.header`
    display: flex;
    gap: 1rem;
    background: white;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    width: 40.625rem;
    margin-top: 1rem;
    padding: 0.25rem 1rem;
    div{
        img{
            border-radius: 10px;
        }
    }
    nav ul{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        list-style-type: none;
        text-decoration: none;
    }

    nav ul a {
        text-decoration: none;
        color: #000;
    }

    nav ul a li {
        display: flex;
        gap: 0.25rem;

        :hover {
            color:#ce2929
        }
    }

    @media (max-width:600px){
        margin-top: 0;
        border-radius: 0;
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
