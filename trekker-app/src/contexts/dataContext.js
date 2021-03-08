import { useState, createContext } from 'react';

export const dataContext = createContext();

export const Provider = (props) => {

  const [trips, setTrips] = useState([]);
  const [current, setCurrent] = useState([]);

  return (
    <dataContext.Provider value={{
      trips: trips,
      setTrips: setTrips,
      current: current,
      setCurrent: setCurrent
    }}>
      {props.children}
    </dataContext.Provider>
  );
}