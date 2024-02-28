import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;

  .wrapper{
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
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
  }

  .filter {
    width: 100%;
    display: flex;
    align-items: center; 
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: 1rem;

    button {
      width: 100%;
      font-size: 0.75rem;
      font-weight: 400;
      font-family: inherit;
      border-radius: 4px;
      background: #d4d4d8;
      border: 1px solid #d4d4d8;
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