import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import HomePage from "./HomePage";
import ExchangeTokenPage from "./ExchangeTokenPage";
import useQuery from "./hooks/useQuery";

dayjs.extend(duration);

function App() {
  function Routing() {
    const params = useQuery();
    const code = params.find((p) => p.key === "code");

    if (code) return <ExchangeTokenPage />;

    return <HomePage />;
  }

  return (
    <Router>
      <Switch>
        <Route path="*">
          <Routing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
