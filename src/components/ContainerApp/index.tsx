import { HTMLAttributes, ReactNode } from "react";
import { StyledContainerForm } from "./styles";

interface ContainerFormProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}


export function ContainerApp({ children }: ContainerFormProps) {
  return (
    <StyledContainerForm>
      {children}
    </StyledContainerForm>
  )
}
