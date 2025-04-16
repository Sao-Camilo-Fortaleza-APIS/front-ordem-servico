import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FileText, Plus, UserPen } from 'lucide-react';
import { useState } from 'react';
import { ReportModal } from '../Report';
import { TransferOrderModal } from '../TransferOrderModal';
import { Content, Item, TriggerButton } from './styles';

export function MoreActionsMenu({ numberOrder }: { numberOrder: number }) {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openTransferModal, setOpenTransferModal] = useState(false)
  const [openReportModal, setOpenReportModal] = useState(false)

  const handleTransferClick = () => {
    setOpenDropdown(false) // fecha dropdown
    setTimeout(() => {
      setOpenTransferModal(true) // abre modal depois do dropdown sair do DOM
    }, 100) // tempo para Radix animar e desmontar
  }

  const handleAddReportClick = () => {
    setOpenDropdown(false) // fecha dropdown
    setTimeout(() => {
      setOpenReportModal(true) // abre modal depois do dropdown sair do DOM
    }, 100) // tempo para Radix animar e desmontar
  }

  return (
    <>
      <DropdownMenu.Root open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenu.Trigger asChild>
          <TriggerButton aria-label="Abrir menu de ações">
            <Plus size={20} />
          </TriggerButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <Content side="top" align="end">
            <Item onSelect={(e) => {
              e.preventDefault()
              handleAddReportClick()
            }}>
              <FileText size={16} />
              Laudos
            </Item>
            <Item onSelect={(e) => {
              e.preventDefault()
              handleTransferClick()
            }}>
              <UserPen size={16} />
              Transferir Ordem
            </Item>

          </Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <ReportModal
        open={openReportModal}
        onOpenChange={setOpenReportModal}
        numberOrder={numberOrder}
      />

      <TransferOrderModal
        open={openTransferModal}
        onOpenChange={setOpenTransferModal}
        numberOrder={numberOrder}
      />
    </>
  );
}
