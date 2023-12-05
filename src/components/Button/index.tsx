import { ButtonHTMLAttributes } from "react";
import { ButtonStyled } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'search-icon' | 'search' | 'reply' | 'danger'
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <ButtonStyled {...rest}>
      {children}
    </ButtonStyled>
  )
}
