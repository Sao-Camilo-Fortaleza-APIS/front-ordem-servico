import { AddButtonSkeleton, CountText, SkeletonButton, SkeletonText, Table, TableCell, TableContainer, TableHead, TableHeadCell, TableHeader, TableRow } from "./styles";

interface TableSkeletonProps {
  rows?: number
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 1 }) => {
  return (
    <TableContainer>
      <TableHeader>
        <CountText />
      </TableHeader>

      <Table>
        <TableHead>
          <TableHeadCell flexValue={0.7}>
            <SkeletonText width="60%" />
          </TableHeadCell>
          <TableHeadCell flexValue={1}>
            <SkeletonText width="70%" />
          </TableHeadCell>
          <TableHeadCell flexValue={1.5}>
            <SkeletonText width="50%" />
          </TableHeadCell>
          <TableHeadCell flexValue={0.3} alignValue="center">
            <SkeletonText width="80%" />
          </TableHeadCell>
        </TableHead>

        {Array(rows).fill(0).map((_, index) => (
          <TableRow key={index}>
            <TableCell flexValue={0.7}>
              <SkeletonText width="40%" />
            </TableCell>
            <TableCell flexValue={1}>
              <SkeletonText width="80%" />
            </TableCell>
            <TableCell flexValue={1.5}>
              <SkeletonText width="90%" />
            </TableCell>
            <TableCell flexValue={0.3} alignValue="center">
              <SkeletonButton />
            </TableCell>
          </TableRow>
        ))}
      </Table>

      <AddButtonSkeleton />
    </TableContainer>
  )
}
