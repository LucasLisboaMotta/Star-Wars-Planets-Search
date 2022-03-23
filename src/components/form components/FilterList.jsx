import React from 'react';
import MyContext from '../../context/MyContext';

function FilterList() {
  const renderFilter = (filterPlanet, setFilterPlanet) => {
    const removeFilter = (column) => {
      setFilterPlanet({ ...filterPlanet, [column]: { hasFilter: false } });
    };

    const filteredOptions = Object.entries(filterPlanet)
      .filter(([, { hasFilter }]) => hasFilter);

    return (
      filteredOptions.map(([column, { phrase }]) => (
        <li key={ column } data-testid="filter">
          {phrase}
          <button
            type="button"
            onClick={ () => removeFilter(column) }
          >
            X
          </button>
        </li>
      ))
    );
  };

  return (
    <MyContext.Consumer>
      { ({ filterPlanet, setFilterPlanet }) => (
        <ul>
          {renderFilter(filterPlanet, setFilterPlanet)}
        </ul>
      )}
    </MyContext.Consumer>
  );
}

export default FilterList;
