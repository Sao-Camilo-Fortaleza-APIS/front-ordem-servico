import * as Checkbox from "@radix-ui/react-checkbox"
import * as Popover from "@radix-ui/react-popover"
import styled from 'styled-components'

export const TriggerButton = styled(Popover.Trigger)`
  padding: 0.5rem;
  background-color: #D4D4D8;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #71717A;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`

export const PopoverContent = styled(Popover.Content)`
  background-color: white;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 0.5rem;
  min-width: 220px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display:flex;
  flex-direction: column;
  gap:0.5rem;
  color: #71717a; 
  font-weight: 500;
  z-index: 20;
`

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  color: #71717a;
  font-weight: 400;
  border-radius: 0.25rem;

  :hover {
    background-color: #d4d4d8;
  }
`

export const CheckboxRoot = styled(Checkbox.Root)`
  width: 1.125rem;
  height: 1.125rem;
  border: 1px solid #A1A1AA;
  border-radius: 0.25rem;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CheckboxIndicator = styled(Checkbox.Indicator)`
  color: #71717a;
`