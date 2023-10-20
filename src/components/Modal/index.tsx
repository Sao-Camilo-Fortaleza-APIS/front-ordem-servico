import { ReactNode } from 'react';
import { DialogContent, DialogDescription, DialogOverlay, DialogTitle, IconButton } from './styles';
import * as Dialog from '@radix-ui/react-dialog';

import { Search, X } from 'lucide-react';
import { Button } from '../Button';

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
