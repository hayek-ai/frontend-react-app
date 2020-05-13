import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

// Redux
import { connect } from "react-redux";
import { signupUser } from "../store/actions/userActions";

function validateSignupData(newUserData) {
  const errors = {};
  if (newUserData.username.length < 4) {
    errors.username = "must be at least 4 characters long";
  }
  if (newUserData.username.length > 20) {
    errors.username = "cannot be more than 20 characters long";
  }
  if (/[~`@\s!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(newUserData.username)) {
    errors.username =
      "cannot contain spaces or special symbols (use the underscore '_' instead of spaces)";
  }
  return errors;
}

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const Signup = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    errors: {},
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
      errors: validateSignupData({
        ...state,
        [event.target.name]: event.target.value,
      }),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUserData = {
      username: state.username,
      email: state.email,
      password: state.password,
    };
    setLoading(true);
    const responseErrors = await props.signupUser(newUserData);
    if (responseErrors.length > 0) {
      let errors = {};
      for (let i = 0; i < responseErrors.length; i++) {
        errors[responseErrors[i].field] = responseErrors[i].detail;
      }
      setState((prevState) => ({
        ...prevState,
        errors: errors,
      }));
    } else {
      props.history.push(`/confirm`);
    }
    setLoading(false);
  };

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
          disabled={loading}
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

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
};

export default connect(null, { signupUser })(Signup);
