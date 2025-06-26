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
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
     }
     /* Estilo para ocultar as setas internas do input type number */
     input[type="number"]::-webkit-inner-spin-button,
     input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
     }

     .animate-spin {
        animation: spin 1s linear infinite;

        @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
        }
    }

    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

        @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: .5;
        }
        }
    }
`;