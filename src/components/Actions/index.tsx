import styled from 'styled-components';
import { OrderReplyForm } from '../OrderReplyForm';
import { TakeOrderForm } from '../TakeOrderForm';

const ActionsContainer = styled.div`
  display: flex;
  padding: 1rem;
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
`;

const Button = styled.button`
  flex: 1;
  margin: 0 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

interface ActionsProps {
  hasExecutor: boolean
  orderId: number
}

const Actions = ({ hasExecutor, orderId }: ActionsProps) => {

  return (
    <ActionsContainer>
      {hasExecutor ? (
        <OrderReplyForm numberOrder={orderId} />
      ) : (
        <TakeOrderForm numberOrder={orderId} />
      )}
    </ActionsContainer>
  );
};

export default Actions;
