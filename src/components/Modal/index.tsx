import * as Dialog from '@radix-ui/react-dialog';
import { Input, Button, DialogContent, DialogDescription, DialogOverlay, DialogTitle, Fieldset, Flex, IconButton } from './styles';
import { Search, X } from 'lucide-react';
import { ReactElement, ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
}


export function Modal({ children }: ModalProps) {
  return (
    <Dialog.Root>
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
