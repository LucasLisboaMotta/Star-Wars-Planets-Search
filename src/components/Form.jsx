import React, { useState, useEffect } from 'react';
import Filter from './form components/Filter';
import Search from './form components/Search';
import Table from './form components/Table';
import MyContext from '../context/MyContext';

function Form() {
  const inicialFilterState = {
    population: { hasFilter: false, logicalOperators: () => true },
    orbital_period: { hasFilter: false, logicalOperators: () => true },
    diameter: { hasFilter: false, logicalOperators: () => true },
    rotation_period: { hasFilter: false, logicalOperators: () => true },
    surface_water: { hasFilter: false, logicalOperators: () => true },
  };
  const [plantsInfo, setPlanetsInfo] = useState([]);
  const [namePlanetsSearch, SetNamePlanetsSearch] = useState('');
  const [filterPlanet, setFilterPlanet] = useState(inicialFilterState);
  useEffect(() => {
    const getInicialPlanetsAPI = async () => {
      const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const planetsList = await fetch(URL).then((resolve) => resolve.json());
      setPlanetsInfo(planetsList.results);
      console.log(Object.keys(planetsList.results[0]));
    }; getInicialPlanetsAPI();
  }, []);
  return (
    <MyContext.Provider
      value={
        { plantsInfo,
          namePlanetsSearch,
          SetNamePlanetsSearch,
          filterPlanet,
          setFilterPlanet }
      }
    >
      <main>
        <Search />
        <Filter />
        <Table />
      </main>
    </MyContext.Provider>
  );
}

export default Form;
