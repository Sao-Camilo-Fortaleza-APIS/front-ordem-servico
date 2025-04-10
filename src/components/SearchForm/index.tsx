import { ChangeEvent, useState } from 'react';
import { SearchByCPF } from '../SearchByCPF';
import { SearchByOrderNumber } from '../SearchByOrderNumber';
import { SearchByUser } from '../SearchByUser';
import { RadioButton } from './styles';

type SearchType = 'ORDER' | 'USER' | 'CPF'; // Definindo os tipos de pesquisa disponíveis

function SearchForm() {
  const [searchType, setSearchType] = useState<SearchType>('ORDER'); // Estado para rastrear a seleção de pesquisa

  const handleSearchTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value as SearchType); // Atualiza o estado com o tipo de pesquisa selecionado

  };

  return (
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
  );
}

export default SearchForm;
