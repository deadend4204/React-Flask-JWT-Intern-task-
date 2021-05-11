import React, { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

import AuthContext from "../authContext";

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const authContext = useContext(AuthContext);

  if (authContext.checkAuth()) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      </Route>
    );
  } else {
    return (
      <Route {...rest}>
        <Component />
      </Route>
    );
  }
};

export default RestrictedRoute;
