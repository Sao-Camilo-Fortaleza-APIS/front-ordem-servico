import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavbarContainer = styled.nav`
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

    /* selected link */
    :active {
        opacity: 0.8;
    }

    :hover {
        color: #ef4444;
    }
    ${(props) => props.active === 'true' ? `
        color: #ef4444;
        ` : `
        color: #030712;
    `}
`;
/*  display: flex;
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
 } */