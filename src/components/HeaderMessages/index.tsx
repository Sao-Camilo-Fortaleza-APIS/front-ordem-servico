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
  padding: 1rem;
  background-color: #f8f8fa;
  color: #71717a;
  border-bottom: 1px solid #ddd;

  .header-content{
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .status {
    background-color: #6b7280;
    color: #fff;
    font-size: 0.75rem;
    text-transform: uppercase;
    text-align: right;
    align-self: flex-end;
    width: fit-content;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #9ca39c;
  font-size: 1rem;
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
    <BackButton onClick={onBack}><ArrowLeft size={20} />Voltar</BackButton>
    <div className='header-content'>
      <h4>Ordem: {orderData.number} - {capitalizeFirstLetterOfWords(orderData.damage)}</h4>
      <span>{orderData.describe}</span>
      <span><User2 size={20} /> {orderData.awaiting_validate}</span>
      <span><MapPin size={20} /> {capitalizeFirstLetterOfWords(orderData.location)}</span>
      <span><Clock size={20} /> {convertDate(orderData.date_order)}</span>
      <div className='status'>{orderData.awaiting_validate === "Sim" ? "Aguardando validação" : "Em atendimento"}</div>
    </div>
  </HeaderContainer>
);

export default Header;
