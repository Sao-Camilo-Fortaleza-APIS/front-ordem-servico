import { HTMLProps } from "react";
import { LabelStyled, Span } from "./styles";

interface LabelProps extends HTMLProps<HTMLLabelElement> {
  content: string;
  required?: boolean;
  htmlFor: string;
}

export function Label({ content, required, htmlFor, ...rest }: LabelProps) {
  return (
    <LabelStyled>
      <label {...rest} htmlFor={htmlFor}>
        {content}
        {required && <Span>*</Span>}
      </label>
    </LabelStyled>
  )
}

