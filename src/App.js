import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./routing/PrivateRoute";
import RestrictedRoute from "./routing/RestrictedRoute";
import AuthState from "./AuthState";

function App() {
  return (
    <Router>
      <AuthState>
        <Fragment>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <RestrictedRoute exact path="/register" component={Register} />
            <RestrictedRoute exact path="/login" component={Login} />
            <Route exact path="/about" component={About} />
          </Switch>
        </Fragment>
      </AuthState>
    </Router>
  );
}

export default App;
