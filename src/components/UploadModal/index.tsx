import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearch } from '../../contexts/SearchContext';
import { useHistoryData } from '../../hooks/useHistoryData';
import api from '../../services/api';
import { DragDrop } from '../DragDrop';
import { AnimatedBlock, Button, CloseButton, Content, Overlay, Title } from '../Report/styles';
import { Attachment, TableAttachment } from '../TableAttachment';
import { TableSkeleton } from '../TableSkeleton';

export interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  numberOrder: number
  colorScheme?: 'gray' | 'red' | 'blue';
}

export function UploadModal({ open, onOpenChange, numberOrder, colorScheme = "gray" }: UploadModalProps) {
  const { getHistory } = useHistoryData()
  const { resultOrderData } = useSearch()
  const [allAttachment, setAllAttachment] = useState<Attachment[]>([])
  const [isLoading, setIsLoading] = useState(true) // estado para controlar o carregamento dos laudos
  const [isAddingAttachment, setIsAddingAttachment] = useState(false) // estado para controlar se está adicionando um anexo ou não
  useEffect(() => {
    setIsAddingAttachment(false)

    if (open) {
      getHistory(String(numberOrder))
      setIsLoading(true)
      api.get(`/get/archive/${numberOrder}`)
        .then(response => {
          setAllAttachment(response.data)
          setIsLoading(false)
        })
        .catch(error => {
          setAllAttachment([])
          console.error(error.response.data.message)
          setIsLoading(false)
        })
    }
  }, [open, numberOrder])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <CloseButton asChild title="Fechar">
            <X size={20} className="close" aria-label="Fechar" style={{ cursor: "pointer" }} />
          </CloseButton>
          <Title>Anexos da Ordem de Serviço {numberOrder}</Title>
          <AnimatedBlock visible={!isAddingAttachment}>
            {isLoading ? (
              <TableSkeleton />
            ) : allAttachment.length > 0 ? (
              <>
                <TableAttachment attachments={allAttachment} />
                {resultOrderData?.stage !== 'Encerrado' ? (
                  <Button onClick={() => setIsAddingAttachment(true)} type="button" colorScheme={colorScheme}>
                    <Upload size={20} /> Adicionar novo anexo
                  </Button>
                ) : (
                  <span style={{ color: '#71717A' }}>Esta Ordem está encerrada encerrada então não é mais possível anexar.</span>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p style={{ marginBottom: '1rem' }}>Nenhum anexo encontrado para esta Ordem de Serviço.</p>
                {resultOrderData?.stage !== 'Encerrado' ? (
                  <DragDrop
                    numberOrder={numberOrder}
                    onOpenChange={onOpenChange}
                    open={open}
                    colorScheme={colorScheme}
                  />
                ) : (
                  <span style={{ color: '#71717A' }}>Esta Ordem está encerrada encerrada então não é mais possível anexar.</span>
                )
                }
              </div>
            )}
          </AnimatedBlock>

          <AnimatedBlock visible={isAddingAttachment}>
            <Button
              type="button"
              className="cancel ghost"
              onClick={() => setIsAddingAttachment(false)}
              style={{ justifySelf: 'flex-start' }}
            >
              {allAttachment && <><ArrowLeft size={20} /> Voltar para lista</>}
            </Button>
            <DragDrop
              numberOrder={numberOrder}
              onOpenChange={onOpenChange}
              open={open}
              colorScheme={colorScheme}
            />
          </AnimatedBlock>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}