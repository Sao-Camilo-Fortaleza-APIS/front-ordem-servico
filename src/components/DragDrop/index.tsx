import Cookies from "js-cookie";
import { Loader2, Upload, X } from "lucide-react";
import { ChangeEvent, ComponentProps, DragEvent, MouseEvent, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistoryData } from "../../hooks/useHistoryData";
import api from "../../services/api";
import { ALLOWED_EXTENSIONS, ALLOWED_MIME_TYPES, validateFiles } from "../../utils/validate-file";
import { Button, DivColumn, DivRow, Input, Label } from "../Report/styles";
import { UploadModalProps } from "../UploadModal";
import { DropContainer, FilePreview, HiddenInput } from "../UploadModal/styles";

interface DragDropProps extends UploadModalProps, ComponentProps<'div'> { }

export function DragDrop({ numberOrder, onOpenChange, open, colorScheme }: DragDropProps) {
    const { getHistory } = useHistoryData()
    const { pathname } = useLocation()

    const userLogged = Cookies.get('user')
    const pathsToCheck = ['/historico', '/ajuste/success/']
    const mustBeWithoutLogin = pathsToCheck.some(path => pathname.includes(path))
    const [userConfirmation, setUserConfirmation] = useState<string | undefined>(mustBeWithoutLogin ? '' : userLogged)
    const nm_user = mustBeWithoutLogin ? userConfirmation : userLogged

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [_, setDragOver] = useState(false)
    const [files, setFiles] = useState<File[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragOver(false)
        const droppedFiles = e.dataTransfer.files
        if (droppedFiles.length > 0) {
            const valid = validateFiles(droppedFiles)
            if (valid.length > 0) {
                setFiles(valid)
            } else {
                e.dataTransfer.clearData
            }
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
        if (!e.target.files) return

        if (e.target.files) {
            const valid = validateFiles(e.target.files)
            if (valid.length > 0) {
                setFiles(valid)
            } else {
                e.target.value = ''
            }
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

        if (!nm_user) {
            setIsLoading(false)
            toast.error('Usuário não encontrado, informe um usuário')
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

        const loadingToast = toast.loading('Anexando arquivo, aguarde...')
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
                autoClose: 8000,
                pauseOnHover: true,
            })
            return
        }

    }
    const accept = [...ALLOWED_EXTENSIONS.map(ext => `.${ext}`), ...ALLOWED_MIME_TYPES].join(',')
    const isDisabled = files?.length === 0 || isLoading

    return (
        <>
            <HiddenInput
                id='fileInput'
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileSelect}
            />

            <DropContainer
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleClick}
            >
                <Button
                    onClick={handleButtonClick}
                    style={{ marginBottom: '0.5rem' }}
                    type="button"
                    colorScheme={colorScheme}
                >
                    <Upload size={20} /> Anexar arquivo
                </Button>

                <p>Arraste e solte os arquivos aqui ou clique para selecionar.</p><p><b>Tipos permitidos:</b> {ALLOWED_EXTENSIONS.join(', ')}</p>
            </DropContainer >

            {files && (
                <FilePreview>
                    <DivRow>
                        {Array.from(files).map((file, index) => {
                            const isImage = file.type.startsWith('image/')
                            const fileURL = URL.createObjectURL(file)
                            return (
                                <div key={index} style={{ textAlign: 'start', display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '0.25rem' }}>
                                        <strong>Arquivo: {file.name} ({file.size / 1024 > 1024 ? `${(file.size / 1024 / 1024).toFixed()} MB` : `${(file.size / 1024).toFixed()} KB`})</strong>
                                        <p
                                            onClick={(e) => {
                                                setFiles(null)
                                                fileInputRef.current && (fileInputRef.current.value = '')
                                            }}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', color: '#ef4444' }} >
                                            <X size={20} />
                                            Descartar
                                        </p>
                                    </div>
                                    {isImage && (<img src={fileURL} alt={file.name} style={{ maxWidth: '200px', aspectRatio: '16 / 9', borderRadius: 8 }} />)}
                                </div>
                            )
                        })}
                    </DivRow>

                    <DivRow style={{ alignItems: 'flex-end', justifyContent: 'flex-end', width: '100%' }}>

                        <DivColumn>
                            <Label style={{ alignSelf: 'start', textAlign: 'start' }} htmlFor="user-confirmation">Usuário do Tasy</Label>
                            <Input
                                value={userConfirmation}
                                onChange={(e) => setUserConfirmation(e.target.value)}
                                disabled={isDisabled || !mustBeWithoutLogin}
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
                            colorScheme={colorScheme}
                        >
                            {isLoading ? <Loader2 className='animate-spin' /> : "Enviar"}
                        </Button>
                    </DivRow>
                </FilePreview>
            )
            }
        </>
    )
}