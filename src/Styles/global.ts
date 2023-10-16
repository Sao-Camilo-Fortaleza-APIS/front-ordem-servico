import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
     }
     body {
          background-color: #E7E7E7;
          font-family: 'Roboto', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
     }

`;