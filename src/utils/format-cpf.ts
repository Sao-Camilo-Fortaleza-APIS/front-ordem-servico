export function formatCPF(value: string) {
    return value
        .replace(/\D/g, '') // remove não-números
        .replace(/(\d{3})(\d)/, '$1.$2') // 123 → 123.456
        .replace(/(\d{3})(\d)/, '$1.$2') // 456 → 456.789
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // 78900 → 789-00
}

export function sanitizeCPF(value: string) {
    return value.replace(/\D/g, ''); // remove tudo que não for número
}
