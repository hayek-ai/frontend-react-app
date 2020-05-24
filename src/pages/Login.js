import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { sendPasswordResetLink } from "../api";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Redux
import { connect } from "react-redux";
import { loginUser } from "../store/actions/userActions";

// Components
import FullPageLayout from "../components/Layout/FullPageLayout";
import ResetPassword from "../components/util/ResetPassword";
import AlertModal from "../components/util/AlertModal";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  generalError: {
    color: theme.palette.error.main,
    marginTop: 20,
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    emailOrUsername: "",
    password: "",
    errors: {},
  });
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    color: null,
  });

  const handleChange = (event) => [
    setState({
      ...state,
      [event.target.name]: event.target.value,
    }),
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      emailOrUsername: state.emailOrUsername,
      password: state.password,
    };
    setLoading(true);
    const responseErrors = await props.loginUser(userData);
    if (responseErrors) {
      let errors = {};
      for (let i = 0; i < responseErrors.length; i++) {
        errors[responseErrors[i].field] = responseErrors[i].detail;
      }
      setState((prevState) => ({
        ...prevState,
        errors: errors,
      }));
      setLoading(false);
    } else {
      setLoading(false);
      props.history.push("/");
    }
  };

  const handleSendPasswordResetLink = async (email) => {
    sendPasswordResetLink(email).then((res) => {
      if (res.errors) {
        setAlertState({
          open: true,
          message: res.errors[0].detail,
          color: "error",
        });
      } else {
        setAlertState({ open: true, message: res.message, color: null });
      }
    });
  };

  return (
    <FullPageLayout containerType="narrowContainer" paperBackground={true}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="emailOrUsername"
          name="emailOrUsername"
          type="text"
          label="Email or Username"
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
        {state.errors.general && (
          <Typography variant="subtitle1" className={classes.generalError}>
            {state.errors.general}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "100%", margin: "30px 0" }}
          disabled={loading}
        >
          Log in
        </Button>
      </form>
      <div style={{ padding: 10 }}>
        <ResetPassword
          handleSendPasswordResetLink={handleSendPasswordResetLink}
        />
      </div>
      <div style={{ padding: 10 }}>
        <Typography variant="body1">
          Don't have an account?{" "}
          <Link to="/signup" className={classes.link}>
            Sign up
          </Link>
        </Typography>
      </div>
      <AlertModal
        open={alertState.open}
        onClose={() => setAlertState({ open: false, message: "" })}
        message={alertState.message}
        color={alertState.color}
      />
    </FullPageLayout>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(null, { loginUser })(Login);
