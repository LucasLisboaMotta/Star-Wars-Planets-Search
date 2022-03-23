import React, { useState, useEffect } from 'react';
import Filter from './form components/Filter';
import Search from './form components/Search';
import Table from './form components/Table';
import FilterList from './form components/FilterList';
import MyContext from '../context/MyContext';

function Form() {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [namePlanetsSearch, SetNamePlanetsSearch] = useState('');
  const [filterPlanet, setFilterPlanet] = useState([]);
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
          setFilterPlanet }
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
        </div>
        <Table />
      </main>
    </MyContext.Provider>
  );
}

export default Form;
