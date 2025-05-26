import styled from 'styled-components';

export const DropContainer = styled.div`
  border: 2px dashed #aaa;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  color: #666;
  background-color: #f9f9f9;
  margin-top: 0.5rem;
  transition: border-color 0.3s;
  cursor: pointer; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 

  &:hover {
    border-color: #333;
  }

  &.dragover {
    border-color: #007bff;
    background-color: #eef;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const FilePreview = styled.div`
  margin-top: 10px;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
