import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './HomePage';
import ExchangeTokenPage from './ExchangeTokenPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/exchange_token">
          <ExchangeTokenPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
