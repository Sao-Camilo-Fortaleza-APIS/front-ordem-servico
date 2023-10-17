import * as Dialog from '@radix-ui/react-dialog';
import { Button, DialogContent, DialogDescription, DialogOverlay, DialogTitle, Fieldset, Flex, IconButton } from './styles';
import { Search, X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}


export function Modal({ open, setOpen, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant='search'>
          <Search size={20} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />

        <DialogContent>
          <DialogTitle>Busca</DialogTitle>
          <DialogDescription asChild>
            <label htmlFor="order">Busque por uma ordem para visualizar os históricos</label>

          </DialogDescription>

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
