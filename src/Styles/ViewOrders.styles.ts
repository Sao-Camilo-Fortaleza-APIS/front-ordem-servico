import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }

  .wrapper{
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;

    .list-orders {
      width: 100%;
      margin-top: 2rem;
    }
  }

  .quantidade {
    width: 100%;
    display: flex;
    align-items: center; 
    justify-content: space-between;
    margin-top: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #71717a;
    span:first-child {
      color: #a1a1aa;
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
  }

  .filter {
    width: 100%;
    display: flex;
    align-items: center; 
    justify-content: space-between;
    gap: 0.25rem;
    margin-top: 1rem;

    button {
      width: 100%;
      font-size: 0.75rem;
      font-weight: 400;
      font-family: inherit;
      border-radius: 4px;
      background: #d4d4d8;
      border: 2px solid #d4d4d8;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  height: 6rem;
  width: 100;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background-color: #fff;
  border-bottom: 1px solid #f4f4f5;
  img {
    height: 5rem;
  }

  .icon{
    color: #a1a1aa;

    :hover {
      cursor: pointer;
    }
  }
`;