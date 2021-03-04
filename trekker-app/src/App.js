import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreatePage from './components/CreatePage';
import RouteDetail from './components/RouteDetail';
import NotFoundPage from './components/NotFoundPage';

const App = () => {
  return (
    <main>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/create" component={CreatePage} />
        <Route path="/route/:id" component={RouteDetail} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  );
}

export default App;
