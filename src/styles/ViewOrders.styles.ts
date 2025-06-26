import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  overflow: hidden;
  overflow-Y: scroll;
  padding: 0 0 5rem 0;
 

  .wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1.5rem;

    .list-orders {
      width: 100%;
      margin-bottom: 5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  .select-group {
    width: 100%;
    height: 2.5rem;
    padding: 0.5rem;
    margin-top: 0.25rem;
    font-size: 1rem;
    font-weight: 500;
    color: #71717a;
    border: 1px solid #d4d4d8;
    border-radius: 0.375rem;
    background: #f4f4f5;
  }

  .legend {
    width: 100%;
    margin-bottom: 1rem;
  }

  .quantidade, .label-groups {
    width: 100%;
    display: flex;
    align-items: center; 
    justify-content: start;
    gap: 0.25rem;
    margin-top: 0.5rem;
    font-size: 1.125rem;
    font-weight: 500;
    color: #a1a1aa;

    span{
      display: flex;
      align-items: center;
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
      border-radius: 0.375rem;
      background: #d4d4d8;
      border: 2px solid #d4d4d8;
    }
  }

  @media (max-width: 426px) {
    .wrapper {
      padding: 0.5rem 0.75rem;
    }

    .quantidade, .label-groups  {
      font-size: 1rem;
      margin-top: 1rem;
    }

    .select-group {
      font-size: 0.875rem;
      margin-top: 0.125rem;
    }

    .legend {
      width: 100%;
      font-size: 0.875rem;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
  background-color: #fff;
  border-bottom: 1px solid #f4f4f5;
  img {
    height: 3rem;
    width: auto;
  }

  .logo-horizontal {
    display: flex;
  }
  .petala {
    display: none;
  }

  .hero {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    font-size: 1rem;
    color: #71717a;

    .user-name {
      display: flex;
      font-weight: 400;
      font-size: 0.875rem;
    }
    
    .logout {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      color: #a1a1aa;
      font-size: 0.875rem;
      font-weight: 400;
      cursor: pointer;
      background-color: transparent;
      border: none;
      border-left: 1px solid #a1a1aa;
      padding: 0.5rem 0 0.5rem 0.875rem;

      :hover {
        color: #71717a;
      }
    }
  }

  @media (max-width:426px){
    padding: 0.5rem 0.75rem;

    img {
      height: 2.5rem;
      width: auto;
    }

    .hero {
      gap: 0.5rem;
      
      .user-name {
        padding-right: 0.5rem;
      }
    }

    .logo-horizontal {
        display: none;
    }
    .petala {
        display: flex;
    }
  }
`;