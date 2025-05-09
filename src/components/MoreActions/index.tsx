import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Edit3, FileText, Paperclip, Plus, UserPen } from 'lucide-react';
import { useState } from 'react';
import { EditStageModal } from '../EditStageModal';
import { ReportModal } from '../Report';
import { TransferOrderModal } from '../TransferOrderModal';
import { UploadModal } from '../UploadModal';
import { Content, Item, TriggerButton } from './styles';

interface MoreActionsMenuProps extends React.HTMLProps<HTMLDivElement> {
  numberOrder: number;
  showUpload?: boolean;
  showEditStage?: boolean;
  showTransfer?: boolean;
  showReports?: boolean;
}

export function MoreActionsMenu({ numberOrder, showUpload = false, showEditStage = false, showTransfer = false, showReports = false, disabled }: MoreActionsMenuProps) {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openTransferModal, setOpenTransferModal] = useState(false)
  const [openReportModal, setOpenReportModal] = useState(false)
  const [openEditStageModal, setOpenEditStageModal] = useState(false)
  const [openUploadModal, setOpenUploadModal] = useState(false)

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

  const handleUploadClick = () => {
    setOpenDropdown(false) // fecha dropdown
    setTimeout(() => {
      setOpenUploadModal(true) // abre modal depois do dropdown sair do DOM
    }, 100) // tempo para Radix animar e desmontar
  }

  return (
    <>
      <DropdownMenu.Root open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenu.Trigger asChild>
          <TriggerButton aria-label="Abrir menu de ações" title="Abrir menu de opções" disabled={disabled}>
            <Plus size={24} />
          </TriggerButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <Content side="top" align="end">

            {showEditStage && (
              <Item onSelect={(e) => {
                e.preventDefault()
                handleEditStageClick()
              }}>
                <Edit3 size={16} />
                Alterar Estágio da Ordem
              </Item>
            )}

            {showUpload && (
              <Item
                onSelect={(e) => {
                  e.preventDefault()
                  handleUploadClick()
                }}
              >
                <Paperclip size={16} />
                Anexos da Ordem
              </Item>
            )}

            {showReports && (
              <Item onSelect={(e) => {
                e.preventDefault()
                handleListReportsClick()
              }}>
                <FileText size={16} />
                Laudos
              </Item>
            )}

            {showTransfer && (
              <Item onSelect={(e) => {
                e.preventDefault()
                handleTransferClick()
              }}>
                <UserPen size={16} />
                Transferir Ordem
              </Item>
            )}

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

      <UploadModal
        open={openUploadModal}
        onOpenChange={setOpenUploadModal}
        numberOrder={numberOrder}
      />
    </>
  );
}
