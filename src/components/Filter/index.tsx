import { HTMLAttributes } from "react";
import { Button } from "../Button";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    title: string;
    isActive?: boolean;
    type: 'do-executor' | 'sem-executor';
};

export function Filter({ title, type, isActive = false, ...rest }: Props) {
    const colorType = type === 'do-executor' ? '#60a5fa' : '#ef4444';
    return (
        <Button
            {...rest}
            style={{
                borderColor: colorType,
                borderWidth: isActive ? 2 : 0,
                color: isActive ? colorType : '#71717A',
            }}

        >
            {title}
        </Button>
    )
}