import { ArrowLeft } from "lucide-react";
import { convertDate } from "../../utils/convert-date";
import { ReportData } from "../Report";
import { Button, DivColumn, DivRow, Input, Label, TextArea } from "../Report/styles";

interface ReportDetailsProps {
    report: ReportData
    onClose: () => void
}

export function ReportDetails({ report, onClose }: ReportDetailsProps) {
    return (
        <div>
            <Button
                type="button"
                className="cancel ghost"
                onClick={onClose}
                style={{ justifySelf: 'flex-start' }}
            >
                <ArrowLeft size={20} /> Voltar para lista
            </Button>
            <DivRow>
                <DivColumn>
                    <Label>Número do Laudo</Label>
                    <Input
                        type="text"
                        value={report.nr_laudo}
                        disabled
                    />
                </DivColumn>
                <DivColumn>
                    <Label>Data de Liberação</Label>
                    <Input
                        type="text"
                        value={convertDate(report.dt_liberacao)}
                        disabled
                    />
                </DivColumn>
            </DivRow>

            <DivRow>
                <DivColumn>
                    <Label>Técnico</Label>
                    <Input
                        type="text"
                        value={report.nm_tecnico}
                        disabled
                    />
                </DivColumn>
            </DivRow>
            <DivRow>
                <DivColumn>
                    <Label>Patrimônio</Label>
                    <Input
                        type="text"
                        value={report.details?.nr_patrimonio}
                        disabled
                    />
                </DivColumn>
                <DivColumn>
                    <Label>Serial</Label>
                    <Input
                        type="text"
                        value={report.details?.nr_serial}
                        disabled
                    />
                </DivColumn>
            </DivRow>

            <DivRow>
                <DivColumn>
                    <Label>Marca</Label>
                    <Input
                        type="text"
                        value={report.details?.ds_marca}
                        disabled
                    />
                </DivColumn>
            </DivRow>

            <DivRow>
                <DivColumn>
                    <Label>Modelo</Label>
                    <Input
                        type="text"
                        value={report.details?.ds_modelo}
                        disabled
                    />
                </DivColumn>
                <DivColumn>
                    <Label>Armazenamento</Label>
                    <Input
                        type="text"
                        value={report.details?.ds_armazenamento}
                        disabled
                    />
                </DivColumn>
            </DivRow>

            <DivRow>
                <DivColumn>
                    <Label>Acessórios</Label>
                    <TextArea
                        value={report.details?.ds_acessorios}
                        disabled
                    />
                </DivColumn>
            </DivRow>

            <DivRow>
                <DivColumn>
                    <Label>Observação</Label>
                    <TextArea
                        value={report.details?.ds_observacao}
                        disabled
                    />
                </DivColumn>
            </DivRow>

            <DivRow>
                <DivColumn>
                    <Label>Defeito/Reclamação</Label>
                    <TextArea
                        value={report.details?.ds_problema}
                        disabled
                    />
                </DivColumn>
            </DivRow>

            <DivRow>
                <DivColumn>
                    <Label>Laudo Técnico</Label>
                    <TextArea
                        value={report.details?.ds_laudo}
                        disabled
                    />
                </DivColumn>
            </DivRow>
        </div>
    )
}