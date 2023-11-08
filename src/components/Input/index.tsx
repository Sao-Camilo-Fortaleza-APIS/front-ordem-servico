import { InputHTMLAttributes } from "react";
import { InputStyled } from "./styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string
  name: string
  value: string | number
  placeholder?: string
  onChange: (e: any) => void
  variant?: 'search' | 'default'
}


export function Input({ type, name, value, placeholder, variant = 'default', ...rest }: InputProps) {
  return (
    <InputStyled type={type} id={name} name={name} placeholder={placeholder} value={value} variant={variant} {...rest} />
  )
}
