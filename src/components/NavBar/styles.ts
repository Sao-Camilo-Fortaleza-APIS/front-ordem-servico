import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
    height: 2.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 1.5rem;
    margin: 1rem 0;
    `;

export const NavItem = styled(Link) < { active: boolean } > `
    width: 100%;
    text-align: center;
    text-decoration: none;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.625rem;
    font-weight: 400;
    transition: all 0.25s ease;

    background-color: #ce2929;
    color: #fff;

    /* selected link */
    :active {
        opacity: 0.8;
    }

    ${(props) => props.active ? `
        background-color: #ce2929;
        color: #fff;

        :hover {
            background-color: #ef4444;
        }
        ` : `
        background-color: #fff;
        color: #ce2929;

        :hover {
            background-color: #fef2f2;
        }
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