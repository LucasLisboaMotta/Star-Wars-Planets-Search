import React, { useState } from 'react';
import MyContext from '../../context/MyContext';

function Filter() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numberValue, setNumberValue] = useState(0);

  const inicialColumns = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const columnOptions = (filterPlanet) => {
    const filteredOptions = inicialColumns
      .filter((currentColumn) => filterPlanet
        .every(([filterColumn]) => filterColumn !== currentColumn));
    return (
      filteredOptions.map(([option]) => (
        <option key={ option } value={ option }>{option}</option>
      ))
    );
  };

  const logicalFuncs = {
    'menor que': (fillValue) => (planetValue) => Number(planetValue) < Number(fillValue),
    'igual a': (fillValue) => (planetValue) => Number(planetValue) === Number(fillValue),
    'maior que': (fillValue) => (planetValue) => Number(planetValue) > Number(fillValue),
  };

  const buttonFilter = (filterPlanet, setFilterPlanet) => {
    const newFilterPlanet = {
      hasFilter: true,
      logicalOperators: logicalFuncs[comparison](numberValue),
      phrase: `${column} ${comparison} ${numberValue}`,
    };
    setFilterPlanet({ ...filterPlanet, [column]: newFilterPlanet });
    setColumn('');
    setNumberValue(0);
  };

  return (
    <MyContext.Consumer>
      { ({ filterPlanet, setFilterPlanet }) => (
        <div>
          <label htmlFor="column">
            Column
            <select
              id="column"
              data-testid="column-filter"
              value={ column }
              onChange={ ({ target: { value } }) => setColumn(value) }
            >
              { columnOptions(filterPlanet)}
            </select>
          </label>
          <label htmlFor="comparison">
            Comparison
            <select
              data-testid="comparison-filter"
              id="comparison"
              value={ comparison }
              onChange={ ({ target: { value } }) => setComparison(value) }
            >
              <option value="maior que">maior que</option>
              <option value="igual a">igual a</option>
              <option value="menor que">menor que</option>
            </select>
          </label>
          <input
            data-testid="value-filter"
            type="number"
            value={ numberValue }
            onChange={ ({ target: { value } }) => setNumberValue(value) }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ () => buttonFilter(filterPlanet, setFilterPlanet) }
          >
            Filter
          </button>
        </div>
      )}
    </MyContext.Consumer>
  );
}

export default Filter;
