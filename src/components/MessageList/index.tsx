// src/components/MessageList.js
import styled from 'styled-components';
import { ResultHistoryDataProps } from '../../Pages/Formularios/Historico';
import { convertDate } from '../../utils/convert-date';

const MessagesContainer = styled.div`
  padding: 1rem;
  overflow-y: scroll;
  background-color: #f4f4f5;
  height: 100%;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 80%;
  overflow-wrap: break-word;
  
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  gap: 1rem;
  text-align: left;
  background-color: ${({ user }: { user: string }) => (user === 'Usuário' ? '#007bff' : '#ddd')};
  color: ${({ user }: { user: string }) => (user === 'Usuário' ? '#fff' : '#333')};
  align-self: ${({ user }: { user: string }) => (user === 'Usuário' ? 'flex-end' : 'flex-start')};

  .user, .data {
    font-size: 0.75rem;
    font-weight: 600;
  }
  .data {
    text-align: right;
  }
`;

interface MessageListProps {
  messages: ResultHistoryDataProps[]
}

const MessageList = ({ messages }: MessageListProps) => (
  <MessagesContainer>
    {messages?.map((msg, index) => (
      <Message key={index} user={msg.user}>
        <span className='user'>{msg.user}</span>
        <span className='content' dangerouslySetInnerHTML={{ __html: msg.history }}></span>
        <span className='data'>{convertDate(msg.date)}</span>
      </Message>
    ))}
    {/* caso não tenha mensagem */}
    {!messages.length && <p>Nenhuma mensagem</p>}
  </MessagesContainer>
);

export default MessageList;
