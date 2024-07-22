import * as PrimitiveTabs from '@radix-ui/react-tabs';
import styled from 'styled-components';

interface ListItemProps {
  isSelected: boolean;
}


export const TabsRoot = styled(PrimitiveTabs.Root)`
  margin-top: 1rem;
`

export const TabsList = styled(PrimitiveTabs.List)`
    width: 100%;
    display: flex;
    gap: 0.5rem;
`

export const TabsTrigger = styled(PrimitiveTabs.Trigger)`
  width: 100%;
  padding: 0.5rem;
  background-color: transparent;
  border-radius: 5px;
  margin-bottom: 1rem;
  box-shadow: 0 0 0 1px #d4d4d8;
  border: none;
  cursor: pointer;

  :hover {
    background-color: #EBEBEB;
  }

  :focus {
    box-shadow: 0 0 0 2px black;
    position: relative;
  }

  &[data-state='active'] {
    background-color: #d4d4d8;
    border: none;
    outline: none;
  }
`

export const TabsContent = styled(PrimitiveTabs.Content)`
  width: 100%;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  background-color: white;
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  outline: none;
`

export const ContentItem = styled.button<ListItemProps>`
  background-color: ${(props) => (props.isSelected ? '#28a745' : '#f8f9fa')};
  color: ${(props) => (props.isSelected ? '#fff' : '#000')};
  border: 1px solid ${(props) => (props.isSelected ? '#28a745' : '#ced4da')};
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  min-height: 3rem;
  font-family: 'Roboto', 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.isSelected ? '#218838' : '#e2e6ea')};
  }
`;

