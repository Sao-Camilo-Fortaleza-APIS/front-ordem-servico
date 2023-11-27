import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./styles";

export interface BubblueButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}
export function BubblueButton(props: BubblueButtonProps) {
  return (
    <StyledButton
      type="button" // sem o type button ele faz o submit do form
      {...props}
    />
  )
}