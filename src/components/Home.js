import React, { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../authContext";

import NavBar from "./Layout/NavBar";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  home: {
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  root: {
    maxWidth: 545,
    marginTop: theme.spacing(4),
  },
  media: {
    height: 140,
  },
}));

const Home = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    try {
      const res = await fetch("/getData", opts);

      if (res.status === 401) {
        authContext.logout();
        return false;
      }
      const data = await res.json();
      if (data.status === 200) setData(data.quotes);
      console.log(data);
    } catch (error) {
      console.error("Error occurred while fetching data from server");
    }
  };

  return (
    <Fragment>
      <NavBar />
      <Typography className={classes.home} variant="h4">
        HOME
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          {data.map((item) => (
            <Card className={classes.root} key={item.tag}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.author}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    {item.text}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Typography>
    </Fragment>
  );
};

export default Home;
