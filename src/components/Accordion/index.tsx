import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { forwardRef } from 'react';
import { StyledChevron, StyledContent, StyledContentText, StyledHeader, StyledItem, StyledRoot, StyledTrigger } from './styles';

const Accordion = StyledRoot

const AccordionItem = StyledItem

const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, ...props }, forwardedRef) => (
  <StyledHeader>
    <StyledTrigger {...props} ref={forwardedRef}>
      {children}
      <StyledChevron aria-hidden />
    </StyledTrigger>
  </StyledHeader>
));

const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    <StyledContentText>{children}</StyledContentText>
  </StyledContent>
));


export {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
};

