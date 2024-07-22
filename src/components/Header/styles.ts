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
    box-shadow: 0px 0.625rem 2.5rem -0.75rem #00000056;
    .logo-horizontal {
        display: block;
    }
    .logo-vertical {
        display: none;
    }

    @media (max-width:600px){
        margin-top: 0;
        border-radius: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: end;

        .logo-horizontal {
            display: none;
        }
        .logo-vertical {
            display: block;
        }
    }
`
