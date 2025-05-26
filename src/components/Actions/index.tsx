import styled from 'styled-components';
import { OrderReplyForm } from '../OrderReplyForm';
import { TakeOrderForm } from '../TakeOrderForm';

const ActionsContainer = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
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
