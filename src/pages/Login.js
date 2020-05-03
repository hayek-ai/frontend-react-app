import React, { useState } from "react";
import { Link } from "react-router-dom";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    username: "",
    password: "",
    loading: false,
    errors: {},
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  const handleChange = (event) => [
    setState({
      ...state,
      [event.target.name]: event.target.value,
    }),
  ];

  return (
    <Paper
      elevation={0}
      style={{
        height: "100vh",
        borderRadius: 0,
      }}
    >
      <div
        style={{
          maxWidth: 425,
          margin: "auto",
          textAlign: "center",
          padding: 25,
          paddingTop: 50,
        }}
      >
        <TextField
          id="username"
          name="username"
          type="text"
          label="Username"
          helperText={state.errors.username}
          error={state.errors.username ? true : false}
          value={state.username}
          onChange={handleChange}
          style={{ margin: "10px 0" }}
          fullWidth
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          helperText={state.errors.password}
          error={state.errors.password ? true : false}
          value={state.password}
          onChange={handleChange}
          style={{ margin: "10px 0" }}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ width: "100%", margin: "30px 0" }}
        >
          Log in
        </Button>
        <div style={{ padding: 10 }}>
          <Link to="/recover-password" style={{ textDecoration: "none" }}>
            <Typography variant="body1" color="primary">
              Forgot password?
            </Typography>
          </Link>
        </div>
        <div style={{ padding: 10 }}>
          <Typography variant="body1">
            Don't have an account?{" "}
            <Link to="/signup" className={classes.link}>
              Sign up
            </Link>
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default Login;
