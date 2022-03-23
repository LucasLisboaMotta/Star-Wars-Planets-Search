import React from 'react';
import MyContext from '../../context/MyContext';

function Table() {
  const renderList = (planet) => (
    <tr key={ planet.name }>
      <td data-testid="planet-name">{planet.name}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{planet.population}</td>
      <td>{planet.films}</td>
      <td>{planet.created}</td>
      <td>{planet.edited}</td>
      <td>{planet.url}</td>
    </tr>
  );
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        <MyContext.Consumer>
          { ({ planetsInfo, namePlanetsSearch, filterPlanet, sortColumns }) => {
            let planetsFiltered = planetsInfo
              .filter(({ name }) => name.includes(namePlanetsSearch));

            filterPlanet.forEach(({ filterColumn, logicalOperators }) => {
              planetsFiltered = planetsFiltered
                .filter((element) => logicalOperators(element[filterColumn]));
            });
            if (planetsFiltered.length > 1) planetsFiltered.sort(sortColumns);

            return planetsFiltered.map((planet) => renderList(planet));
          }}
        </MyContext.Consumer>
      </tbody>
    </table>
  );
}

export default Table;
