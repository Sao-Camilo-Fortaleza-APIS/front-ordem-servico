import { ChangeEvent, useState } from 'react';
import { SearchByUser } from '../SearchByUser';
import { SearchByOrderNumber } from '../SearchByOrderNumber';
import { RadioButton } from './styles';

function SearchForm() {
  const [searchType, setSearchType] = useState<string>('ORDER'); // Estado para rastrear a seleção de pesquisa

  const handleSearchTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value);
  };

  return (
    <div>
      <RadioButton>
        <div>
          <input
            type="radio"
            id="order"
            value="ORDER"
            checked={searchType === 'ORDER'}
            onChange={handleSearchTypeChange}
          />
          <label htmlFor="order">Pesquisa por Ordem</label>
        </div>
        <div>
          <input
            type="radio"
            id="user"
            value="USER"
            checked={searchType === 'USER'}
            onChange={handleSearchTypeChange}
          />
          <label htmlFor="user">Pesquisa por Usuário</label>
        </div>
      </RadioButton>

      {searchType === 'USER' && (
        <SearchByUser />
      )}

      {searchType === 'ORDER' && (
        <SearchByOrderNumber />
      )}
    </div>
  );
}

export default SearchForm;
