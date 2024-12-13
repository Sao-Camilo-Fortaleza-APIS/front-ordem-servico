import styled from 'styled-components';
import { ResultHistoryDataProps } from '../../Pages/Formularios/Historico';
import { convertDate } from '../../utils/convert-date';

const MessagesContainer = styled.div`
  display:flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #f4f4f5;
  min-height: 20rem;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 80%;
  overflow-wrap: break-word;
  
  padding: 0.75rem;
  margin: 0.75rem 0;
  border-radius: 8px;
  gap: 1rem;
  text-align: left;
  background-color: ${({ user }: { user: string }) => (user === 'executor' ? '#3b82f6' : '#ddd')};
  color: ${({ user }: { user: string }) => (user === 'executor' ? '#fff' : '#333')};
  align-self: ${({ user }: { user: string }) => (user === 'executor' ? 'flex-end' : 'flex-start')};

  .user {
    font-size: 0.75rem;
    font-weight: 600;
  }
  .data {
    text-align: right;
    font-size: 0.625rem;
    font-weight: 400;
  }
  .content{
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;

interface MessageListProps {
  messages: ResultHistoryDataProps[]
  userLogged: string
}

function MessageList({ messages, userLogged }: MessageListProps) {
  //console.log(userLogged)
  return (
    <MessagesContainer>
      {messages?.map((msg, index) => (
        <Message key={index} user={msg.user === userLogged ? 'executor' : 'solicitante'}>
          <span className='user'>{msg.user}</span>
          <span className='content' dangerouslySetInnerHTML={{ __html: msg.history }}></span>
          <span className='data'>{convertDate(msg.date)}</span>
        </Message>
      ))}
      {/* caso não tenha mensagem */}
      {!messages.length && <p style={{ textAlign: 'center', color: '#a1a1aa' }}>Nenhuma mensagem</p>}
    </MessagesContainer>
  )
}

export default MessageList;
