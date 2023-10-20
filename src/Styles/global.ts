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
     /* Estilo para ocultar as setas internas do input type number */
     input[type="number"]::-webkit-inner-spin-button,
     input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
     }

`;