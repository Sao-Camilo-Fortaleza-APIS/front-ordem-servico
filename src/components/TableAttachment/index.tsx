import { Download } from "lucide-react";
import { convertDate } from "../../utils/convert-date";
import { Table, TableCell, TableContainer, TableHeader, TableHeaderCell, TableRow } from "../TableReport/styles";

export interface Attachment {
  link: string
  name: string
  created: Date//Data de upload
  user: string// Usuário que fez o upload
}

export interface TableAttachmentProps {
  attachments: Attachment[]
  hasCaption?: boolean
}



export function TableAttachment({ attachments, hasCaption = true }: TableAttachmentProps) {
  return (
    <TableContainer>
      <Table>
        {hasCaption && (
          <caption>
            {attachments.length || 0} anexo(s) encontrado(s)
          </caption>
        )}
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Data</TableHeaderCell>
            <TableHeaderCell>Usuário</TableHeaderCell>
            <TableHeaderCell>Baixar</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {attachments.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()).map((attachment, index) => (
            <TableRow key={index}>
              <TableCell style={{ whiteSpace: 'normal', fontSize: '0.875rem' }}>{attachment.name}</TableCell>
              <TableCell style={{ whiteSpace: 'normal', fontSize: '0.875rem' }}>{convertDate(attachment.created, "DD/MM/YYYY HH[h]mm")}</TableCell>
              <TableCell style={{ fontSize: '0.875rem' }}>{attachment.user}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <a target="_parent" title="Baixar anexo" href={`${import.meta.env.VITE_BASE_URL}${attachment.link}`}>
                  <Download size={20} />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}