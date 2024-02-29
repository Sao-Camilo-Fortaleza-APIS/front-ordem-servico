import { HTMLAttributes } from "react";
import { Button } from "../Button";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    title: string;
    isActive?: boolean;
    type: 'byExecutor' | 'byPending';
};

export function Filter({ title, type, isActive = false, ...rest }: Props) {
    return (
        <Button
            {...rest}
        >
            {title}
        </Button>
    )
}