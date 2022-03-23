import React from 'react';
import MyContext from '../../context/MyContext';

function Search() {
  return (
    <MyContext.Consumer>
      { ({ namePlanetsSearch, SetNamePlanetsSearch }) => (
        <div>
          <label htmlFor="search">
            Planet Name
            <input
              id="search"
              value={ namePlanetsSearch }
              onChange={ ({ target: { value } }) => SetNamePlanetsSearch(value) }
              data-testid="name-filter"
            />
          </label>
        </div>
      )}
    </MyContext.Consumer>
  );
}

export default Search;
