import * as Popover from "@radix-ui/react-popover"
import { Check, Funnel } from "lucide-react"
import { useEffect, useState } from "react"
import { Button, CheckboxIndicator, CheckboxLabel, CheckboxRoot, PopoverContent } from "./styles"

const statusOptions = [
    'Aguardando Atendimento',
    'Aguardando Compras',
    'Aguardando Fornecedor',
    'Aguardando Validação',
    'Aguardando manutenção predial',
    'Aguardando retorno Solicitante',
    'Atendimento Programado',
    'Em Atendimento',
    'Enviado para Philips',
    'Desenvolvimento Philips',
    'Não Solucionado',
    'Retorno Philips',
    'Encerrado'
]
interface FilterStatusProps {
    onFilterChange: (selected: string[]) => void
}

const LOCAL_STORAGE_KEY = 'selectedFilters'

export function FilterStatus({ onFilterChange }: FilterStatusProps) {
    const [selected, setSelected] = useState<string[]>(statusOptions)

    const isAllSelected = selected.length === statusOptions.length

    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (saved) {
            const parsed = JSON.parse(saved)
            setSelected(parsed)
            onFilterChange(parsed)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selected))
    }, [selected])

    const toggleOption = (option: string) => {
        const updated = selected.includes(option)
            ? selected.filter((item) => item !== option)
            : [...selected, option]

        setSelected(updated)
        onFilterChange(updated)
    }

    const toggleSelectAll = () => {
        const updated = isAllSelected ? [] : [...statusOptions]
        setSelected(updated)
        onFilterChange(updated)
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button title="Filtrar Ordens por Estágio">
                    <Funnel fill="#71717A" size={20} /> Filtros
                </Button>
            </Popover.Trigger>

            <PopoverContent side="left" sideOffset={5}>
                <span>Filtre as Ordens por estágio</span>
                <div>
                    <CheckboxLabel>
                        <CheckboxRoot
                            checked={isAllSelected}
                            onCheckedChange={toggleSelectAll}
                        >
                            <CheckboxIndicator>
                                <Check />
                            </CheckboxIndicator>
                        </CheckboxRoot>
                        Todos os estágios
                    </CheckboxLabel>

                    {statusOptions.map((option) => (
                        <CheckboxLabel key={option}>
                            <CheckboxRoot
                                checked={selected.includes(option)}
                                onCheckedChange={() => toggleOption(option)}
                            >
                                <CheckboxIndicator>
                                    <Check />
                                </CheckboxIndicator>
                            </CheckboxRoot>
                            {option}
                        </CheckboxLabel>
                    ))}
                </div>
            </PopoverContent>
        </Popover.Root>
    )
}
