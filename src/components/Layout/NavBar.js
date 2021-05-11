import React, { useContext } from "react";
import AuthContext from "../../authContext";

import { Toolbar, AppBar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  login: {
    textDecoration: "none",
    color: "white",
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const onLogout = () => {
    authContext.logout();
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            AppBar
          </Typography>
          {authContext.checkAuth() ? (
            <Button onClick={onLogout} color="inherit">
              Logout
            </Button>
          ) : (
            <Button color="inherit">
              <Link className={classes.login} to="/login">
                Login
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
