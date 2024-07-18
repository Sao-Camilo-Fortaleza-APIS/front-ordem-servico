import * as PrimitiveTabs from '@radix-ui/react-tabs';
import styled from 'styled-components';

interface ListItemProps {
  isSelected: boolean;
}


export const TabsRoot = styled(PrimitiveTabs.Root)`

.tabsContent {
  
}
.tabsContent:focus {
  box-shadow: 0 0 0 2px black;
}

.text {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--mauve-11);
  font-size: 15px;
  line-height: 1.5;
}

.fieldset {
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.label {
  font-size: 13px;
  line-height: 1;
  margin-bottom: 10px;
  color: var(--violet-12);
  display: block;
}

.input {
  flex: 1 0 auto;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  color: var(--violet-11);
  box-shadow: 0 0 0 1px var(--violet-7);
  height: 35px;
}
.input:focus {
  box-shadow: 0 0 0 2px var(--violet-8);
}

.button {
  background-color: transparent;
  color: #000;
  border: 1px solid #d4d4d8;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  min-height: 3rem;
  font-family: 'Roboto', 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  user-select: none;
  background-color: #d4d4d8;
  :hover {
    color: #000;
  }
}
.button.green {
  background-color: var(--green-4);
  color: var(--green-11);
}
.button.green:hover {
  background-color: var(--green-5);
}
.button.green:focus {
  box-shadow: 0 0 0 2px var(--green-7);
}
`
export const TabsList = styled(PrimitiveTabs.List)`
    width: 100%;
    display: flex;
    gap: 0.5rem;
`

export const ContentListItem = styled.button<ListItemProps>`
  background-color: ${(props) => (props.isSelected ? '#28a745' : '#f8f9fa')};
  color: ${(props) => (props.isSelected ? '#fff' : '#000')};
  border: 2px solid ${(props) => (props.isSelected ? '#28a745' : '#ced4da')};
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

export const TabsTrigger = styled(PrimitiveTabs.Trigger)`
  width: 100%;
  padding: 0.5rem;
  background-color: transparent;
  border: 1px solid #000;
  border-radius: 5px;
  margin-bottom: 1rem;
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
   /*  width: 100%;
    background-color: transparent;
    padding: 1rem 0.5rem;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

    .tabs-trigger:first-child{
        border-top-left-radius: 0.75rem;
    }
    .tabs-trigger:last-child {
        border-top-right-radius: 0.75rem;
    }
    .tabs-trigger[data-state='active'] {
        color: #f00;
        box-shadow: 0 0 0 2px #f00;
    }

    .tabs-trigger:focus {
        position: relative;
        box-shadow: 0 0 0 2px black;
    }

    button {
        padding: 0.5rem 1rem;
        min-height: 3rem;
        border-radius: 0.75rem;
        background-color: transparent;
        border: 1px solid #d4d4d8;
        font-family: 'Roboto', 'Inter', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        color: #000;
        cursor: pointer;
        user-select: none;

        :hover {
            background-color: #d4d4d8;
            color: #000;
        }
    } */
`
