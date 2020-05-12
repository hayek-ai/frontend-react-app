import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "../util/axios";

// Mui stuff
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

// Redux
import { connect } from "react-redux";
import { confirmUser } from "../store/actions/userActions";

// Components
import AlertModal from "../components/util/AlertModal";
import WithLoading from "../components/util/WithLoading";

const Confirmation = (props) => {
  const [loading, setLoading] = useState(false);
  const [resendAlert, setResendAlert] = useState(false);
  const [state, setState] = useState({
    verificationCode: "",
    errors: {},
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const resendConfirmation = () => {
    setLoading(true);
    axios
      .post("/resend-confirmation")
      .then((res) => {
        setResendAlert(true);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const responseErrors = await props.confirmUser(state.verificationCode);
    if (responseErrors.length > 0) {
      let errors = { message: responseErrors[0]["detail"] };
      setState((prevState) => ({ ...prevState, errors: errors }));
      setLoading(false);
    } else {
      setLoading(false);
      props.history.push("/");
    }
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
        <WithLoading loading={loading}>
          <Typography variant="body1" style={{ padding: 10 }}>
            We sent you a code
          </Typography>
          <TextField
            id="verificationCode"
            name="verificationCode"
            type="text"
            label="Verification Code"
            helperText={state.errors.message}
            error={state.errors.message ? true : false}
            value={state.verificationCode}
            onChange={handleChange}
            style={{ margin: "10px 0" }}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ width: "100%", margin: "30px 0" }}
            disabled={loading}
          >
            Confirm Account
          </Button>
          <div style={{ padding: "60px 20px" }}>
            <Typography variant="body1">
              Didn't receive email?{" "}
              <Button
                variant="text"
                color="primary"
                onClick={resendConfirmation}
              >
                Click here to resend
              </Button>
            </Typography>
          </div>
        </WithLoading>
      </div>
      <AlertModal
        open={resendAlert}
        onClose={() => setResendAlert(false)}
        message="We sent you another confirmation code!"
      />
    </Paper>
  );
};

Confirmation.propTypes = {
  confirmUser: PropTypes.func.isRequired,
};

export default connect(null, { confirmUser })(Confirmation);
