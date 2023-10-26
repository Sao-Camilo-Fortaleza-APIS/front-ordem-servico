import { FocusEvent, MouseEvent, ReactNode } from 'react';
import { DialogContent, DialogDescription, DialogOverlay, DialogTitle, IconButton } from './styles';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export interface ModalProps {
  children: ReactNode;
  open: boolean;
  trigger: ReactNode;
  title: string;
  description?: string;
  overlay?: boolean;
  setOpen: (open: boolean) => void;
  isInteractiveOutside?: boolean;
}

export function Modal({ open, setOpen, children, trigger, title,
  description, overlay = true, isInteractiveOutside = true }: ModalProps) {

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>


      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        {overlay && <DialogOverlay />}

        <DialogContent onInteractOutside={(event) => { !isInteractiveOutside && event.preventDefault() }}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>

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
