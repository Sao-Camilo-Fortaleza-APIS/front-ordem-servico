import { FocusEvent, MouseEvent, ReactNode, forwardRef } from 'react';
import { DialogContent, DialogDescription, DialogOverlay, DialogTitle, IconButton } from './styles';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export interface ModalProps {
  children: ReactNode;
  title: string;
  description?: string;
  overlay?: boolean;
  isInteractiveOutside?: boolean;
  size: string | undefined
}

interface Props extends DialogPrimitive.DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Content = forwardRef(
  ({
    children,
    title,
    size,
    description,
    overlay = true,
    isInteractiveOutside = true,
  }: ModalProps, forwardedRef) => (
    <DialogPrimitive.Portal>
      {overlay && <DialogOverlay />}

      <DialogContent
        style={{ width: size }}
        ref={forwardedRef}
        onInteractOutside={(event: any) => { !isInteractiveOutside && event.preventDefault() }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>

        {children}

        <DialogPrimitive.Close asChild>
          <IconButton aria-label='Close'>
            <X size={20} />
          </IconButton>
        </DialogPrimitive.Close>

      </DialogContent>
    </DialogPrimitive.Portal>
  )
);

export const Dialog = ({ open, setOpen, ...props }: Props) => (
  <DialogPrimitive.Root open={open} onOpenChange={setOpen} {...props} />
);
export const Trigger = DialogPrimitive.Trigger;