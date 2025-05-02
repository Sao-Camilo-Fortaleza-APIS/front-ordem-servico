import { Button } from "../Report/styles";
import { Table, TableCell, TableContainer, TableHeader, TableHeaderCell, TableRow } from "../TableReport/styles";

export function TableOrdersPendingValidation() {
    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Nº</TableHeaderCell>
                        <TableHeaderCell>Título</TableHeaderCell>
                        <TableHeaderCell>Data</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <tbody>
                    <TableRow>
                        <TableCell>12345</TableCell>
                        <TableCell>Teste de chamado</TableCell>
                        <TableCell>10/10/2025</TableCell>
                        <TableCell><Button>Aprovar</Button></TableCell>
                        <TableCell><Button>Reprovar</Button></TableCell>
                    </TableRow>
                </tbody>
            </Table>
        </TableContainer>
    )
}