import { useState, createContext } from 'react';

export const dataContext = createContext();

export const Provider = (props) => {

  const [trips, setTrips] = useState([]);
  const [start, setStart] = useState({});

  // now i need to add logic for adding a new starting point
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { location: {start: start}};
    console.log('hello')
    if (start) {
      const post = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch('http://localhost:5000/api', post)
        .then((data) => data.json())
        .then((newStart) => {
          setTrips(trips.concat(newStart));
        });
    }
  };

  // now i need to handle the start change
  const handleStartChange = ([lng, lat]) => {
    //event.preventDefault();
    setStart([lng, lat]);
  }

  return (
    <dataContext.Provider value={{
      trips: trips,
      setTrips: setTrips,
      start: start,
      setStart: setStart,
      handleSubmit: handleSubmit,
      handleStartChange: handleStartChange
    }}>
      {props.children}
    </dataContext.Provider>
  );
}