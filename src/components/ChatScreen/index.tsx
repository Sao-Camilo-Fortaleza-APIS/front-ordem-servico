import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ResultHistoryDataProps, ResultOrderDataProps } from '../../Pages/Formularios/Historico';
import Actions from '../Actions';
import Header from '../HeaderMessages';
import MessageList from '../MessageList';

const ChatContainer = styled.div`
  background-color: #f2f4f8;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 48rem;
  @media (max-width:649px){
        width: 100%;
        height: 100%;
        h2{
            font-size: medium;
        }
    }
`;

const FixedHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #f4f4f5;
  box-sizing: border-box;
  padding: 3rem 0;
  text-align: center;

.info {
    color: #a1a1aa;
    ::before {
        content: '• ';
    }
    ::after {
        content: ' •';
    }
    }
`;

const FixedFooter = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 10;
  background-color: #f8f9fa;
`;

interface ChatScreenProps {
    orderData: ResultOrderDataProps;
    historyData: ResultHistoryDataProps[];
    onBack: () => void;
}

const ChatScreen = ({ orderData, onBack, historyData }: ChatScreenProps) => {
    const user = Cookies.get('user') || ''
    const hasExecutor = orderData.executor !== null;
    const [lastUpdate, setLastUpdate] = useState(new Date())

    useEffect(() => {
        setLastUpdate(new Date())
    }, [])

    return (
        <ChatContainer>
            <FixedHeader>
                <Header orderData={orderData} onBack={onBack} />
            </FixedHeader>
            <ScrollableContent>
                <span className='info'>Início da conversa</span>
                <MessageList messages={historyData} userLogged={user} />
                <span className='info'>Atualizado em: {dayjs(lastUpdate).format('DD/MM/YYYY [às] HH:mm')}</span>
            </ScrollableContent>
            <FixedFooter>
                <Actions
                    orderId={orderData.number}
                    hasExecutor={hasExecutor}
                />
            </FixedFooter>
        </ChatContainer>
    );
};

export default ChatScreen;
