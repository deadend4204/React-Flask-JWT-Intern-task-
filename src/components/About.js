import React, { Fragment } from "react";

import NavBar from "./Layout/NavBar";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  about: {
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <NavBar />
      <Typography className={classes.about} variant="h4">
        About Us || Public Page
      </Typography>
    </Fragment>
  );
};

export default About;
