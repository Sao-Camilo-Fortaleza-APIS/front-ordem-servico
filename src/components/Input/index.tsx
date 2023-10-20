import { InputHTMLAttributes } from "react";
import { Element } from "./styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string
  name: string
  value: string | number
  placeholder?: string
  onChange: (e: any) => void
}


export function Input({ type, name, value, placeholder, ...rest }: InputProps) {
  return (
    <Element type={type} id={name} name={name} placeholder={placeholder} value={value} {...rest} />
  )
}
