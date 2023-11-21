import { ComponentProps } from "react";

export interface BubblueButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode
}
export function BubblueButton(props: BubblueButtonProps) {
  return (
    <button
      {...props}
    />
  )
}