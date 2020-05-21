import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "../util/axios";

// Mui stuff
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { confirmUser } from "../store/actions/userActions";

// Components
import AlertModal from "../components/util/AlertModal";
import WithLoading from "../components/util/WithLoading";
import FullPageLayout from "../components/Layout/FullPageLayout";

const Confirmation = (props) => {
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    color: null,
  });
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
        setLoading(false);
        if (res.errors) {
          setAlertState({
            open: true,
            message: res.errors[0]["detail"],
            color: "error",
          });
        } else {
          setAlertState({
            open: true,
            message: res.data.message,
            color: null,
          });
        }
      })
      .catch((err) => setLoading(false));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state.verificationCode.length === 6) {
      setLoading(true);
      const responseErrors = await props.confirmUser(state.verificationCode);
      if (responseErrors) {
        let errors = { message: responseErrors[0]["detail"] };
        setState((prevState) => ({ ...prevState, errors: errors }));
        setLoading(false);
      } else {
        setLoading(false);
        props.history.push("/");
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        errors: { message: "That confirmation code is incorrect." },
      }));
    }
  };

  return (
    <FullPageLayout containerType="narrowContainer" paperBackground={true}>
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
            <Button variant="text" color="primary" onClick={resendConfirmation}>
              Click here to resend
            </Button>
          </Typography>
        </div>
      </WithLoading>
      <AlertModal
        open={alertState.open}
        onClose={() => setAlertState({ open: false, message: "" })}
        message={alertState.message}
        color={alertState.color}
      />
    </FullPageLayout>
  );
};

Confirmation.propTypes = {
  confirmUser: PropTypes.func.isRequired,
};

export default connect(null, { confirmUser })(Confirmation);
