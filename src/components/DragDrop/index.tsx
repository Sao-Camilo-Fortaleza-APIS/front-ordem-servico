import Cookies from "js-cookie";
import { Loader2, Upload } from "lucide-react";
import { ChangeEvent, DragEvent, MouseEvent, useState } from "react";
import { toast } from "react-toastify";
import { useHistoryData } from "../../hooks/useHistoryData";
import api from "../../services/api";
import { Button, DivColumn, DivRow, Input, Label } from "../Report/styles";
import { UploadModalProps } from "../UploadModal";
import { DropContainer, FilePreview, HiddenInput } from "../UploadModal/styles";

export function DragDrop({ numberOrder, onOpenChange, open }: UploadModalProps) {
    const { getHistory } = useHistoryData()
    const userLogged = Cookies.get('user')
    const [userConfirmation, setUserConfirmation] = useState<string | undefined>(userLogged)

    const [_, setDragOver] = useState(false)
    const [files, setFiles] = useState<FileList | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragOver(false)
        const droppedFiles = e.dataTransfer.files
        if (droppedFiles.length > 0) {
            setFiles(droppedFiles)
        }
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragOver(true)
    }

    const handleDragLeave = () => {
        setDragOver(false)
    }

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = e.target.files
            setFiles(selectedFiles)
        }
    }

    const handleClick = () => {
        document.getElementById('fileInput')?.click()
    }

    const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        document.getElementById('fileInput')?.click()
    }

    const handleUpload = async (e?: MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault()
        setIsLoading(true)

        const nm_user = userLogged ? userLogged : userConfirmation
        if (!nm_user) {
            setIsLoading(false)
            toast.error('Usuário não encontrado')
            return
        }
        if (!numberOrder) {
            setIsLoading(false)
            toast.info('Número da Ordem de Serviço não encontrado')
            return
        }

        if (!files || files.length === 0) {
            setIsLoading(false)
            toast.error('Nenhum arquivo selecionado')
            return
        }
        const file = files[0]
        const formData = new FormData()
        formData.append('nr_order', numberOrder.toString())
        formData.append('nm_user', nm_user)
        formData.append('archive', file)

        const loadingToast = toast.loading('Anexando arquivo...')
        try {
            await api
                .post('/post/archive',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    })

            getHistory(numberOrder.toString())

            toast.update(loadingToast, {
                render: 'Anexo enviado!',
                type: 'success',
                isLoading: false,
                autoClose: 1000,
                closeButton: true,
            })

            onOpenChange(false)
            setFiles(null)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            toast.update(loadingToast, {
                render: `${(error as any)?.response?.data?.message || "Erro ao enviar o anexo"}`,
                type: 'error',
                isLoading: false,
                autoClose: 2000,
            })
            return
        }

    }

    const isDisabled = !files || files.length === 0 || userConfirmation === '' || isLoading

    return (
        <>
            <HiddenInput
                id='fileInput'
                type="file"
                onChange={handleFileSelect}
            />

            <DropContainer
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleClick}
            >
                <Button onClick={handleButtonClick} style={{ marginBottom: '0.5rem' }} type="button"><Upload size={20} /> Anexar arquivo</Button>

                <p>Arraste e solte os arquivos aqui ou clique para selecionar</p>
            </DropContainer>

            {files && (
                <FilePreview>
                    <DivRow>
                        {Array.from(files).map((file, index) => (
                            <span key={index} style={{ textAlign: 'start' }}>Arquivo selecionado: {file.name}</span>
                        ))}
                    </DivRow>

                    <DivRow style={{ alignItems: 'flex-end', justifyContent: 'flex-end', }}>

                        <DivColumn>
                            <Label style={{ textAlign: 'start' }} htmlFor="user-confirmation">Usuário do Tasy</Label>
                            <Input
                                value={userConfirmation}
                                onChange={(e) => setUserConfirmation(e.target.value)}
                                disabled={userLogged !== undefined || isDisabled}
                                type="text"
                                autoComplete="off"
                                required
                                autoFocus
                                placeholder="Exemplo: nome.sobrenome"
                                id="user-confirmation"
                                name="user-confirmation"
                            />
                        </DivColumn>
                        <Button
                            onClick={handleUpload}
                            type="button"
                            disabled={isDisabled}
                        >
                            {isLoading ? <Loader2 className='animate-spin' /> : "Enviar"}
                        </Button>
                    </DivRow>
                </FilePreview>
            )}
        </>
    )
}