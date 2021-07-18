import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import HomePage from "./HomePage";
import ExchangeTokenPage from "./ExchangeTokenPage";

dayjs.extend(duration);

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
