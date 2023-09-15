import { Element } from "./styles";

interface InputProps {
  type: string
  name: string
  value: string | number
  placeholder?: string
  onChange: (e: any) => void
}


export function Input({ type, name, value, placeholder, ...rest }: InputProps) {
  return (
    <Element required type={type} id={name} name={name} placeholder={placeholder} value={value} {...rest} />
  )
}
