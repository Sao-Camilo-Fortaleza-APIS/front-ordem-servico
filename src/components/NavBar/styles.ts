import styled from "styled-components";

export const StyledNavBar = styled.nav`
    margin-top: 1rem;
    width: 650px;
    height: auto;
    background: #CE2929;
    display: flex;
    padding: 2rem 1rem;
    border-radius: 10px 10px 0 0;
`;

export const StyledNavList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 4rem;
    list-style: none;
    width: 100%;
    li{
        transition: all 0.25s ease;
        font-weight: 500;
        :hover{
            text-decoration: underline;
            text-decoration-color: #fff;
            cursor: pointer;
        }
        a {
            text-decoration: none;
            color: #fff;
        }
        span {
            color: #fff;
            font-weight: 600;
        }
    }
`;