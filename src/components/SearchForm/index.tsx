import { ChangeEvent, useState } from 'react';
import { SearchUserComponent } from '../SearchUserComponent';
import { SearchOrderComponent } from '../SearchOrderComponent';
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
        <SearchUserComponent />
      )}

      {searchType === 'ORDER' && (
        <SearchOrderComponent />
      )}
    </div>
  );
}

export default SearchForm;
