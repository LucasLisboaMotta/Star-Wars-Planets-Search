import React from 'react';
import MyContext from '../../context/MyContext';

function Search() {
  return (
    <div>
      <label htmlFor="search">
        Planet Name
        <MyContext.Consumer>
          { ({ namePlanetsSearch, SetNamePlanetsSearch }) => (<input
            id="search"
            value={ namePlanetsSearch }
            onChange={ ({ target: { value } }) => SetNamePlanetsSearch(value) }
            data-testid="name-filter"
          />)}
        </MyContext.Consumer>
      </label>
    </div>
  );
}

export default Search;
