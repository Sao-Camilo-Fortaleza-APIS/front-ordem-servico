import { ReactNode } from "react";
import { StyledContainerForm } from "./styles";

interface ContainerFormProps{
  children: ReactNode;
}


export function ContainerForm({ children }: ContainerFormProps) {
  return (
    <StyledContainerForm>
      {children}
    </StyledContainerForm>
  )
}
