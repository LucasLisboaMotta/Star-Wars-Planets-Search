import React, { useState, useEffect } from 'react';
import Filter from './form components/Filter';
import Search from './form components/Search';
import Table from './form components/Table';
import FilterList from './form components/FilterList';
import Sort from './form components/Sort';
import MyContext from '../context/MyContext';

function Form() {
  const defaltSortFunc = (a, b) => {
    const ONE_NEGATIVE = -1;
    if (a.name > b.name) return 1;
    if (b.name > a.name) return ONE_NEGATIVE;
    return 0;
  };

  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [namePlanetsSearch, SetNamePlanetsSearch] = useState('');
  const [filterPlanet, setFilterPlanet] = useState([]);
  const [sortColumns, setSortColumns] = useState(() => defaltSortFunc);
  useEffect(() => {
    const getInicialPlanetsAPI = async () => {
      const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const planetsList = await fetch(URL).then((resolve) => resolve.json());
      setPlanetsInfo(planetsList.results);
    }; getInicialPlanetsAPI();
  }, []);
  return (
    <MyContext.Provider
      value={
        { planetsInfo,
          namePlanetsSearch,
          SetNamePlanetsSearch,
          filterPlanet,
          setFilterPlanet,
          sortColumns,
          setSortColumns }
      }
    >
      <main>
        <Search />
        <Filter />
        <div>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => {
              SetNamePlanetsSearch('');
              setFilterPlanet([]);
            } }
          >
            Remove All Filters
          </button>
          <FilterList />
          <Sort />
        </div>
        <Table />
      </main>
    </MyContext.Provider>
  );
}

export default Form;
