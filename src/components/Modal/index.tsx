import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button, DialogContent, DialogDescription, DialogOverlay, DialogTitle, IconButton, Label } from './styles';

import { Search, X } from 'lucide-react';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}


export function Modal({ open, setOpen, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant='search-icon'>
          <Search size={24} color='white' />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />

        <DialogContent>
          <DialogTitle>Busca</DialogTitle>
          <DialogDescription>Busque por uma ordem para visualizar os históricos</DialogDescription>

          <Label htmlFor="order">Número da Ordem de Serviço</Label>
          {children}

          <Dialog.Close asChild>
            <IconButton aria-label='Close'>
              <X size={20} />
            </IconButton>
          </Dialog.Close>

        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
