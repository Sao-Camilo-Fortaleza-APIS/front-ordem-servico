import { ButtonHTMLAttributes, forwardRef } from "react";
import { ButtonStyled } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'search-icon' | 'search' | 'reply' | 'danger'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ButtonStyled ref={ref} {...rest}>
        {children}
      </ButtonStyled>
    )
  }
)
