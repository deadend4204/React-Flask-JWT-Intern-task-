import React, { Fragment, useContext, useState } from "react";
import AuthContext from "../authContext";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Container,
  Button,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  link: {
    color: "blue",
  },
}));

const Login = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { login } = authContext;
  const [auth, setAuth] = useState({ email: "", password: "" });

  const { email, password } = auth;

  const onChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };
  const onLogin = (e) => {
    e.preventDefault();
    login(auth);
  };
  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <Typography variant="h4">Welcome</Typography>
          <form onSubmit={onLogin} className={classes.form}>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
            >
              <TextField
                value={email}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                value={password}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <input type="submit" value="Login" /> */}
              <Button
                type="submit"
                className={classes.submit}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </form>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/register" className={classes.link}>
                <Typography variant="subtitle2">
                  Don't have an account? Register
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Login;
