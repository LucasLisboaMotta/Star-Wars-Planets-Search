import React from 'react';
import MyContext from '../../context/MyContext';

function FilterList() {
  const renderFilter = (filterPlanet, setFilterPlanet) => {
    const removeFilter = (column) => {
      setFilterPlanet(filterPlanet.filter(({ filterColumn }) => filterColumn !== column));
    };

    return (
      filterPlanet.map(({ filterColumn, phrase }) => (
        <li key={ filterColumn } data-testid="filter">
          {phrase}
          <button
            type="button"
            onClick={ () => removeFilter(filterColumn) }
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
