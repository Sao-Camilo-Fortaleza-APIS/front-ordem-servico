import { toast } from "react-toastify"

export const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'xml', 'mp4', 'txt', 'wav', 'gif', 'odt', 'ods', 'ots', 'jfif', 'zip', 'webm', 'webp']
export const ALLOWED_MIME_TYPES = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.oasis.opendocument.spreadsheet-template',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/xml',
    'application/zip',
    'application/x-zip-compressed',
    'audio/wav',
    'text/csv',
    'text/xml',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif',
    'video/mp4',
    'video/webm',
    'image/webp',
]

export function validateFiles(fileList: FileList): File[] {
    const validFiles: File[] = []
    const invalidFiles: string[] = []

    Array.from(fileList).forEach(file => {
        const extension = file.name.split('.').pop()?.toLowerCase()
        const isValidExtension = extension && ALLOWED_EXTENSIONS.includes(extension)
        const isValidMime = ALLOWED_MIME_TYPES.includes(file.type)

        if (isValidExtension && isValidMime) {
            validFiles.push(file)
        } else {
            invalidFiles.push(file.name)
        }
    })

    if (invalidFiles.length > 0) {
        toast.error("Tipo de arquivo inválido, selecione uma extensão permitida")
    }
    return validFiles
}

