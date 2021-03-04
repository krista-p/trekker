import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreatePage from './components/CreatePage';
import RouteDetail from './components/RouteDetail';
import NotFoundPage from './components/NotFoundPage';
import { useEffect, useState } from 'react';

const App = () => {

  const [starts, setStarts] = useState([]);
  const [start, setStart] = useState({});

  //console.log(starts)
  console.log(start)

  // fetch all of the starting points from the db
  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then((data) => data.json())
      .then((db) => {
        setStarts(db.data);
      });
  }, []);

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
          setStarts(starts.concat(newStart));
        });
    }
  };

  // now i need to handle the start change
  const handleStartChange = ([lng, lat]) => {
    //event.preventDefault();
    setStart([lng, lat]);
  }

  return (
    <main>
      <Switch>
        <Route path="/" exact component={() => <HomePage starts={starts} start={start} />} />
        <Route path="/create" component={() => <CreatePage starts={starts} start={start} handleStartChange={handleStartChange} handleSubmit={handleSubmit} />} />
        <Route path="/route/:id" component={RouteDetail} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  );
}

export default App;
