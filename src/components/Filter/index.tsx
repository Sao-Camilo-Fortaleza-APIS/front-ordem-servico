import { HTMLAttributes } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../Button";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    title: string;
    isActive?: boolean;
};

export function Filter({ title, isActive = false, ...rest }: Props) {
    const { pathname: location } = useLocation()
    let colorType = location === '/ordens/minhas' ? '#60a5fa' : '#ef4444';

    return (
        <Button
            {...rest}
            style={{
                borderColor: colorType,
                borderWidth: isActive ? 2 : 0,
                color: isActive ? colorType : '#71717A',
                fontWeight: 'bold',
            }}

        >
            {title}
        </Button>
    )
}