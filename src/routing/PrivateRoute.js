import React, { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

import AuthContext from "../authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const authContext = useContext(AuthContext);

  if (authContext.checkAuth()) {
    return (
      <Route {...rest}>
        <Component />
      </Route>
    );
  } else {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }
};

export default PrivateRoute;
