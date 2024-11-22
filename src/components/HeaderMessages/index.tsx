// src/components/Header.js
import { ArrowLeft, Clock, MapPin, User2 } from 'lucide-react';
import styled from 'styled-components';
import { ResultOrderDataProps } from '../../Pages/Formularios/Historico';
import { convertDate } from '../../utils/convert-date';
import { capitalizeFirstLetterOfWords } from '../../utils/transform-text';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background-color: #f8f8fa;
  color: #71717a;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  .header-content{
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
  .order-title, .order-description {
    word-break: break-word;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  @media (max-width:360px){
    .date {
      font-size: 0.875rem;
    }
  }
`;

const Status = styled.span`
    text-transform: uppercase;
    background-color: ${({ stage }: { stage: string }) => (
    stage === 'Aguardando Atendimento' ? '#EF4444' : (
      stage === 'Em Atendimento' ? '#FBBF24' : (
        stage === 'Aguardando Validação' ? '#3B82F6' : '#6B7280'
      ))
  )};
    color: #fff;
    
    font-size: 0.75rem;
    text-align: right;
    align-self: flex-end;
    width: fit-content;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #9ca39c;
  font-size: 1.125rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  &:hover {
    text-decoration: underline;
  }
`;

interface HeaderProps {
  orderData: ResultOrderDataProps
  onBack: () => void
}

const Header = ({ orderData, onBack }: HeaderProps) => (
  <HeaderContainer>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <BackButton onClick={onBack}><ArrowLeft size={20} />Voltar</BackButton>
      <Status stage={orderData.stage}>{orderData.stage}</Status>
    </div>
    <div className='header-content'>
      <h4 className='order-title'>Ordem: {orderData.number} - {capitalizeFirstLetterOfWords(orderData.damage)}</h4>
      <span className='order-description'>{orderData.describe}</span>
      <span><User2 size={20} /> {capitalizeFirstLetterOfWords(orderData.requester)}</span>
      <span><MapPin size={20} /> {capitalizeFirstLetterOfWords(orderData.location)}</span>
      <span className='date'><Clock size={20} /> {convertDate(orderData.date_order)}</span>
    </div>
  </HeaderContainer>
);

export default Header;
