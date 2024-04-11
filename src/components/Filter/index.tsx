import { HTMLAttributes } from "react";
import { Button } from "../Button";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    title: string;
    isActive?: boolean;
    type: 'do-executor' | 'sem-executor';
};

export function Filter({ title, type, isActive = false, ...rest }: Props) {
    const colorType = type === 'do-executor' ? '#f59e0b' : '#60a5fa';
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