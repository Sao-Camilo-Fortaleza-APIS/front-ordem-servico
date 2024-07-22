import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavBarContainer = styled.nav`
    width: auto;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0.625rem;
    margin: 1rem 0;

    @media (max-width: 600px){
        width: 95%;
        height: auto;
        display: flex;  
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        gap: 0.5rem;
    }
`;

export const NavItem = styled(Link) < { active: string } > `
    text-align: center;
    text-decoration: none;
    font-size: 1rem;
    border-radius: 0.5rem;
    font-weight: 400;
    transition: all 0.25s ease;
    display: flex;
    gap: 0.25rem;
    justify-content: center;
    align-items: center;
    position: relative;
    color: #333;
    padding-bottom: 0.2rem;
    ::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 0;
        background-color: #ef4444;
        transition: width 0.5s ease;
    }
    :hover::after {
        width: 100%;
    }
    // QUANDO TIVER ATIVO COLOCAR UMA BORDA VERMELHA EMBAIXO
    ${(props) => props.active === 'true' ? `
        color: #ef4444;
        ` : ``}
`;
