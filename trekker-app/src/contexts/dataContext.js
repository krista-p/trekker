import { useState, createContext } from 'react';

export const dataContext = createContext();

export const Provider = (props) => {

  const [trips, setTrips] = useState([]);

  return (
    <dataContext.Provider value={{
      trips: trips,
      setTrips: setTrips,
    }}>
      {props.children}
    </dataContext.Provider>
  );
}