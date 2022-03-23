import React, { useState } from 'react';
import MyContext from '../../context/MyContext';

function Sort() {
  const [selectValue, setSelectValue] = useState('population');
  const [radioValue, setRadioValue] = useState({ ascending: true, descendant: false });

  const REPLACE_UNKNOWN = -1;

  const ascending = (sortColumn) => () => (a, b) => {
    if (a[sortColumn] === 'unknown') return 1;
    if (b[sortColumn] === 'unknown') return REPLACE_UNKNOWN;
    return Number(a[sortColumn]) - Number(b[sortColumn]);
  };

  const descendant = (sortColumn) => () => (a, b) => {
    if (a[sortColumn] === 'unknown') return 1;
    if (b[sortColumn] === 'unknown') return REPLACE_UNKNOWN;
    return Number(b[sortColumn]) - Number(a[sortColumn]);
  };

  return (
    <MyContext.Consumer>
      {({ setSortColumns }) => (
        <div>
          <label htmlFor="columnSortSelect">
            Order
            <select
              id="columnSortSelect"
              data-testid="column-sort"
              value={ selectValue }
              onChange={ ({ target: { value } }) => setSelectValue(value) }
            >
              <option value="population">population</option>
              <option value="orbital_period">orbital_period</option>
              <option value="diameter">diameter</option>
              <option value="rotation_period">rotation_period</option>
              <option value="surface_water">surface_water</option>
            </select>
          </label>
          <label htmlFor="ascending">
            Ascending
            <input
              data-testid="column-sort-input-asc"
              id="ascending"
              checked={ radioValue.ascending }
              type="radio"
              onChange={ () => setRadioValue({ ascending: true, descendant: false }) }
            />
          </label>
          <label htmlFor="descendant">
            Descendant
            <input
              data-testid="column-sort-input-desc"
              id="descendant"
              checked={ radioValue.descendant }
              type="radio"
              onChange={ () => setRadioValue({ ascending: false, descendant: true }) }
            />
          </label>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ () => {
              if (radioValue.ascending) setSortColumns(ascending(selectValue));
              if (radioValue.descendant) setSortColumns(descendant(selectValue));
            } }
          >
            Order
          </button>
        </div>
      )}
    </MyContext.Consumer>
  );
}

export default Sort;
