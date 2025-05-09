import { Search } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { Button } from '../Button';
import { Content, Dialog, Trigger } from '../Modal';
import { SearchByCPF } from '../SearchByCPF';
import { SearchByOrderNumber } from '../SearchByOrderNumber';
import { SearchByUser } from '../SearchByUser';
import { RadioButton } from './styles';

interface SearchFormProps {
  open: boolean; // Propriedade para controlar a abertura do modal
  setOpen: (open: boolean) => void; // Função para atualizar o estado de abertura do modal
}

type SearchType = 'ORDER' | 'USER' | 'CPF'; // Definindo os tipos de pesquisa disponíveis

export default function SearchFormDialog({ open, setOpen }: SearchFormProps) {
  const [searchType, setSearchType] = useState<SearchType>('ORDER'); // Estado para rastrear a seleção de pesquisa

  const handleSearchTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value as SearchType); // Atualiza o estado com o tipo de pesquisa selecionado

  };

  return (
    <Dialog open={open} setOpen={setOpen}>
      <Content
        size="xl"
        title="Buscar"
        description="Pesquise o número da ordem de serviço para visualizar seus históricos."
      >
        <div>
          <span>Prefiro pesquisar por:</span>
          <RadioButton>
            <div>
              <input
                type="radio"
                id="order"
                value="ORDER"
                checked={searchType === 'ORDER'}
                onChange={handleSearchTypeChange}
              />
              <label htmlFor="order">Ordem</label>
            </div>
            <div>
              <input
                type="radio"
                id="user"
                value="USER"
                checked={searchType === 'USER'}
                onChange={handleSearchTypeChange}
              />
              <label htmlFor="user">Usuário</label>
            </div>

            <div>
              <input
                type="radio"
                id="cpf"
                value="CPF"
                checked={searchType === 'CPF'}
                onChange={handleSearchTypeChange}
              />
              <label htmlFor="cpf">CPF</label>
            </div>
          </RadioButton>

          {searchType === 'USER' && (
            <SearchByUser />
          )}

          {searchType === 'ORDER' && (
            <SearchByOrderNumber />
          )}

          {searchType === 'CPF' && (
            <SearchByCPF />
          )}
        </div>

      </Content>
      <Trigger asChild>
        <Button variant='search-icon'>
          <Search size={24} color='white' />
        </Button>
      </Trigger>
    </Dialog>
  );
}
