import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { DragDrop } from '../DragDrop';
import { AnimatedBlock, Button, CloseButton, Content, Overlay, Title } from '../Report/styles';
import { Attachment, TableAttachment } from '../TableAttachment';
import { TableSkeleton } from '../TableSkeleton';

export interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  numberOrder: number
}

export function UploadModal({ open, onOpenChange, numberOrder }: UploadModalProps) {
  const [allAttachment, setAllAttachment] = useState<Attachment[]>([])
  const [isLoading, setIsLoading] = useState(true) // estado para controlar o carregamento dos laudos
  const [isAddingAttachment, setIsAddingAttachment] = useState(false) // estado para controlar se está adicionando um anexo ou não

  useEffect(() => {
    setIsAddingAttachment(false)

    if (open) {
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
                <Button onClick={() => setIsAddingAttachment(true)} type="button">
                  <Upload size={20} /> Adicionar novo anexo
                </Button>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p style={{ marginBottom: '0.5rem' }}>Nenhum anexo encontrado para esta Ordem de Serviço.</p>
                <DragDrop
                  numberOrder={numberOrder}
                  onOpenChange={onOpenChange}
                  open={open}
                />
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
            />
          </AnimatedBlock>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}