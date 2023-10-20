import { HTMLProps, LabelHTMLAttributes } from "react";
import { LabelStyled, Span } from "./styles";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: string;
  required?: boolean;
  htmlFor: string;
}

export function Label({ children, required, htmlFor, ...rest }: LabelProps) {
  return (
    <LabelStyled {...rest} htmlFor={htmlFor}>
      {children}
      {required && <Span>*</Span>}
    </LabelStyled>
  )
}

