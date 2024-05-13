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
    padding: 0.5rem 1.5rem;

    .list-orders {
      width: 100%;
      //margin-top: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  @media (max-width: 426px) {
    .wrapper {
      padding: 0.5rem 0.75rem;
    }
  }

  .select-group {
    width: 100%;
    height: 2.5rem;
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: #71717a;
    border: 1px solid #d4d4d8;
    border-radius: 4px;
    background: #f4f4f5;
  }

  .quantidade, .label-groups {
    width: 100%;
    display: flex;
    align-items: center; 
    justify-content: start;
    gap: 0.25rem;
    margin-top: 1rem;
    font-size: 1.125rem;
    font-weight: 500;
    color: #a1a1aa;
    // color: #71717a;

    span{
      display: flex;
      align-items: center;
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
  height: 4.5rem;
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