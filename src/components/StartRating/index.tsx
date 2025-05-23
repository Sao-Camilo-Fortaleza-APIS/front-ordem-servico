import React, { useState } from "react";
import styled from "styled-components";

const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

const Star = styled.span < { filled: boolean; readOnly?: boolean } > `
  font-size: 2rem;
  line-height: 1;
  color: ${({ filled }) => (filled ? "#FFD700" : "#ccc")};
  transition: color 0.2s;
  cursor: ${({ readOnly }) => (readOnly ? "not-allowed" : "pointer")};

  ${({ readOnly }) =>
        !readOnly &&
        `
    &:hover {
      color: #ffc107;
    }
  `}
`;

export interface SatisfactionOption {
    ds_valor: string;
    vl_dominio: string;
}

interface StarRatingProps {
    options: SatisfactionOption[]
    onRatingChange?: (rating: string) => void
    initialValue?: string
    readOnly?: boolean
}

export const StarRating: React.FC<StarRatingProps> = ({ options, initialValue, onRatingChange }) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(initialValue || null)
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)

    const handleClick = (index: number) => {
        const value = options[index].vl_dominio
        setSelectedValue(value)
        onRatingChange?.(value)
    }

    return (
        <StarWrapper>
            {options.map((option, index) => (
                <Star
                    key={option.vl_dominio}
                    title={option.ds_valor}
                    filled={hoverIndex !== null ? index <= hoverIndex : option.vl_dominio === selectedValue || index < options.findIndex(o => o.vl_dominio === selectedValue)}
                    onClick={() => handleClick(index)}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    ★
                </Star>
            ))}
        </StarWrapper>
    );
}
