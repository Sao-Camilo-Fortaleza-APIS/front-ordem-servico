// src/components/ChatScreen.js
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
    status: string;
    onBack: () => void;
}

const ChatScreen = ({ orderData, status, onBack, historyData }: ChatScreenProps) => {
    const [messages, setMessages] = useState([
        { sender: 'Suporte', text: 'Bem-vindo ao atendimento!' },
    ]);
    const [historyDataState, setHistoryData] = useState<ResultHistoryDataProps[]>([]);
    const hasExecutor = orderData.executor !== null;

    const handleSendMessage = (text: string) => {
        setMessages([...messages, { sender: 'Usuário', text }]);
    };
    console.log("hasExecutor", hasExecutor)
    console.log("executor", orderData.executor)

    useEffect(() => {
        // Simular busca da API usando o orderId
        setHistoryData(historyData);
    }, []);

    return (
        <ChatContainer>
            <FixedHeader>
                <Header orderData={orderData} onBack={onBack} />
            </FixedHeader>
            <ScrollableContent>
                <MessageList messages={historyData} />
            </ScrollableContent>
            <FixedFooter>
                <Actions
                    orderId={orderData.number}
                    hasExecutor={hasExecutor}
                    onSendMessage={(message) => {
                        setHistoryData([
                            ...historyDataState,
                            { date: new Date().toISOString(), user: 'Usuário', history: message }
                        ])
                    }}
                />
            </FixedFooter>
        </ChatContainer>
    );
};

export default ChatScreen;
