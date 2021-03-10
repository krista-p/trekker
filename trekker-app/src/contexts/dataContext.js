import { useState, createContext, useEffect } from 'react';

export const dataContext = createContext();

export const Provider = (props) => {

  const [trips, setTrips] = useState([]);
  const [current, setCurrent] = usePersistedCurrent('currentTrip', null);

  function usePersistedCurrent(key, defaultValue) {
    const [current, setCurrent] = useState(
      () => JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(current));
    }, [key, current]);
    return [current, setCurrent];
  };

  return (
    <dataContext.Provider value={{
      trips: trips,
      setTrips: setTrips,
      current: current,
      setCurrent: setCurrent,
    }}>
      {props.children}
    </dataContext.Provider>
  );
}