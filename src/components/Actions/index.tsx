// src/components/Actions.js
import { useState } from 'react';
import styled from 'styled-components';
import { TakeOrderForm } from '../TakeOrderForm';

const ActionsContainer = styled.div`
  display: flex;
  padding: 1rem;
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
 /*  position: fixed;
  bottom: 0;
  width: auto; */
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
    status: string
    onSendMessage: (message: string) => void
    orderId: number
}

const Actions = ({ status, onSendMessage, orderId }: ActionsProps) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <ActionsContainer>
            {status === 'pendente' ? (
                <TakeOrderForm numberOrder={orderId} />
            ) : (
                <>
                    <Input
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button onClick={handleSend}>Enviar</Button>
                </>
            )}
        </ActionsContainer>
    );
};

export default Actions;
