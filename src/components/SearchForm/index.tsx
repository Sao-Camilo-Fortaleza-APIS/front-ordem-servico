import { ChangeEvent, useState } from 'react';
import { SearchUserComponent } from '../SearchUserComponent';

function SearchForm() {
  const [searchType, setSearchType] = useState('USER'); // Estado para rastrear a seleção de pesquisa

  const handleSearchTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="radio"
          id="user"
          value="USER"
          checked={searchType === 'USER'}
          onChange={handleSearchTypeChange}
        />
        <label htmlFor="user">Pesquisar por Usuário</label>
      </div>

      <div>
        <input
          type="radio"
          id="order"
          value="ORDER"
          checked={searchType === 'ORDER'}
          onChange={handleSearchTypeChange}
        />
        <label htmlFor="order">Pesquisar por Ordem</label>
      </div>

      {searchType === 'USER' && (
        <SearchUserComponent />
      )}

      {searchType === 'ORDER' && (
        <div>
          {/* Formulário para pesquisa por número de ordem */}
          <label>Número da Ordem:</label>
          <input type="text" />
          <button>Pesquisar Ordem</button>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
