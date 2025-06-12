import { useState } from "react";
import styled from "styled-components";

const ReadMore = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: 0.875rem;
  margin: 0.25rem 0 0.775rem;
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
`;

interface ReadMoreTextProps {
    text: string;
    maxChars?: number;
}


export const ReadMoreText = ({ text, maxChars = 100 }: ReadMoreTextProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isTooLong = text?.length > maxChars;
    const displayedText = isExpanded || !isTooLong ? text : text.slice(0, maxChars) + '...';

    return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
            <span>{displayedText}</span>
            {isTooLong && (
                <ReadMore onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? 'Mostrar menos' : 'Mostrar mais'}
                </ReadMore>
            )}
        </div>
    );
};