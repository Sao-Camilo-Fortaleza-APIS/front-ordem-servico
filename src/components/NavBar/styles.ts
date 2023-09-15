import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
    height: 2.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 2rem;
    margin: 1rem 0;
    /*     background-color: #CE2929; */
    `;

export const NavItem = styled(Link) < { active: boolean } > `
    width: 100%;
    height: 100%;
    text-align: center;
    text-decoration: none;
    font-size: 1rem;
    padding: 0.625rem;
    border-radius: 0.625rem;

    background-color: #ce2929;
    color: #fff; 
    ${(props) => props.active ? `
        background-color: #ce2929;
        color: #fff;
        ` : `
        background-color: #fff;
        color: #ce2929;    
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