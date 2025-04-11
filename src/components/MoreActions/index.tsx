import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FileText, Paperclip, UserPen } from 'lucide-react';
import { Content, Item, TriggerButton } from './styles';

export function MoreActionsMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <TriggerButton aria-label="Abrir menu de ações">
          <Paperclip size={20} />
        </TriggerButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <Content side="top" align="end">
          <Item>
            <FileText size={16} />
            Preencher laudo
          </Item>
          <Item>
            <UserPen size={16} />
            Transferir Ordem
          </Item>
        </Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
