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

const Signup = () => {
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
        <Typography variant="body1">
          Getting started with hayek is free and takes less than a minute.
        </Typography>
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
          id="email"
          name="email"
          type="text"
          label="Email"
          helperText={state.errors.email}
          error={state.errors.email ? true : false}
          value={state.email}
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
          style={{ width: "100%", margin: "30px 0 20px" }}
        >
          Sign up
        </Button>
        <div>
          <Typography variant="subtitle2">
            By signing up, you are agreeing to our{" "}
            <Link to="/terms-of-use" className={classes.link}>
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className={classes.link}>
              Privacy Policy
            </Link>
          </Typography>
        </div>
        <div style={{ padding: 20 }}>
          <Typography variant="body1">
            Already have an account?{" "}
            <Link to="/login" className={classes.link}>
              Log in
            </Link>
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default Signup;
