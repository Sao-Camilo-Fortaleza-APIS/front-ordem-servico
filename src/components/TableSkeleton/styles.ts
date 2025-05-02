import styled, { keyframes } from 'styled-components';

// Animação de pulse para o efeito skeleton
export const pulse = keyframes`
  0% {
    background-color: rgba(229, 231, 235, 0.6);
  }
  50% {
    background-color: rgba(229, 231, 235, 0.9);
  }
  100% {
    background-color: rgba(229, 231, 235, 0.6);
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const CountText = styled.div`
  width: 150px;
  height: 16px;
  background-color: #e5e7eb;
  border-radius: 4px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const Table = styled.div`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.div`
  width: 100%;
  background-color: #f9fafb;
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 600;
`;

export const TableRow = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

interface TableCellProps {
  flexValue?: number;
  alignValue?: string;
}

export const TableHeadCell = styled.div<TableCellProps>`
  flex: ${props => props.flexValue || 1};
  color: #6b7280;
  text-align: ${props => props.alignValue || 'left'};
  font-size: 14px;
`;

export const TableCell = styled.div<TableCellProps>`
  flex: ${props => props.flexValue || 1};
  text-align: ${props => props.alignValue || 'left'};
  display: flex;
  align-items: center;
`;

interface SkeletonTextProps {
  width?: string;
}

export const SkeletonText = styled.div<SkeletonTextProps>`
  width: ${props => props.width || '80%'};
  height: 16px;
  background-color: #e5e7eb;
  border-radius: 4px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const SkeletonButton = styled.div`
  width: 24px;
  height: 24px;
  background-color: #e5e7eb;
  border-radius: 4px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const AddButtonSkeleton = styled.div`
  width: 150px;
  height: 40px;
  background-color: #e5e7eb;
  border-radius: 6px;
  margin: 16px;
  float: right;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;