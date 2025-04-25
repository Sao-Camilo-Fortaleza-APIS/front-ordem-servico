import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Edit3, FileText, Plus, UserPen } from 'lucide-react';
import { useState } from 'react';
import { useSearch } from '../../contexts/SearchContext';
import { isAllowedToviewItem } from '../../utils/allowed-to-view';
import { EditStageModal } from '../EditStageModal';
import { ReportModal } from '../Report';
import { TransferOrderModal } from '../TransferOrderModal';
import { Content, Item, TriggerButton } from './styles';

export function MoreActionsMenu({ numberOrder }: { numberOrder: number }) {
  const { resultOrderData } = useSearch()
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openTransferModal, setOpenTransferModal] = useState(false)
  const [openReportModal, setOpenReportModal] = useState(false)
  const [openEditStageModal, setOpenEditStageModal] = useState(false)  /**
  * Verifica se o usuário tem permissão para visualizar o item "Laudos" no menu de ações se group_planej for igual a 28
  * @returns boolean
  */
  /* const isAllowedToviewItem = () => {
    if (resultOrderData?.group_planej === 28) {
      return true
    }
    return false
  } */

  const handleTransferClick = () => {
    setOpenDropdown(false) // fecha dropdown
    setTimeout(() => {
      setOpenTransferModal(true) // abre modal depois do dropdown sair do DOM
    }, 100) // tempo para Radix animar e desmontar
  }

  const handleListReportsClick = () => {
    setOpenDropdown(false) // fecha dropdown
    setTimeout(() => {
      setOpenReportModal(true) // abre modal depois do dropdown sair do DOM
    }, 100) // tempo para Radix animar e desmontar
  }

  const handleEditStageClick = () => {
    setOpenDropdown(false) // fecha dropdown
    setTimeout(() => {
      setOpenEditStageModal(true) // abre modal depois do dropdown sair do DOM
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
              handleEditStageClick()
            }}>
              <Edit3 size={16} />
              Alterar Estágio da Ordem
            </Item>

            {isAllowedToviewItem() && (
              <Item onSelect={(e) => {
                e.preventDefault()
                handleListReportsClick()
              }}>
                <FileText size={16} />
                Laudos
              </Item>
            )}

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

      <EditStageModal
        open={openEditStageModal}
        onOpenChange={setOpenEditStageModal}
        numberOrder={numberOrder}
      />
    </>
  );
}
