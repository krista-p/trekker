import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreatePage from './components/CreatePage';
import DetailPage from './components/DetailPage';
import NotFoundPage from './components/NotFoundPage';
import { useContext, useEffect } from 'react';
import { dataContext } from './contexts/dataContext';

const App = () => {

  const value = useContext(dataContext);


  // fetch all of the starting points from the db
  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then((data) => data.json())
      .then((db) => {
        value.setTrips(db.data);
      });
  }, []);

  return (
    <main>
      <Switch>
        <Route path="/" exact component={() => <HomePage />} />
        <Route path="/create" component={() => <CreatePage />} />
        <Route path="/route/:id" component={DetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  );
}

export default App;
