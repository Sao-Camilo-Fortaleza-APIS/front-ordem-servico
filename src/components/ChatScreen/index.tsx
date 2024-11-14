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
  width: 40.625rem;
  @media (max-width:600px){
        width: 95%;
        height: 100%;
        h2{
            font-size: medium;
        }
    }
    @media (max-width: 360px) {
        padding: 0 1rem;
    }
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

    const handleSendMessage = (text: string) => {
        setMessages([...messages, { sender: 'Usuário', text }]);
    };

    useEffect(() => {
        // Simular busca da API usando o orderId
        setHistoryData(historyData);
    }, []);

    return (
        <ChatContainer>
            <Header orderData={orderData} onBack={onBack} />
            <MessageList messages={historyData} />
            <Actions
                orderId={orderData.number}
                status={orderData.awaiting_validate === 'Sim' ? 'assumida' : 'pendente'}
                onSendMessage={(message) => {
                    setHistoryData([...historyDataState, { date: new Date().toISOString(), user: 'Usuário', history: message }]);
                }}
            />
        </ChatContainer>
    );
};

export default ChatScreen;
