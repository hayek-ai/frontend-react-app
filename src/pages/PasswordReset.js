import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../api";

// Mui stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Components
import FullPageLayout from "../components/Layout/FullPageLayout";
import AlertModal from "../components/util/AlertModal";

const PasswordReset = (props) => {
  const { resetId } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    color: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tempErrors = {};
    let noErrors = true;
    if (password.length < 4) {
      tempErrors.password = "Password must be at least 4 characters long";
      noErrors = false;
    }
    if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords must match";
      noErrors = false;
    }
    if (noErrors) {
      setLoading(true);
      resetPassword(resetId, password).then((res) => {
        setLoading(false);
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
    } else {
      setErrors(tempErrors);
    }
  };

  const handleAlertClose = () => {
    props.history.push("/");
  };

  return (
    <FullPageLayout containerType="narrowContainer" paperBackground={true}>
      <TextField
        id="password"
        name="password"
        type="password"
        label="New Password"
        helperText={errors.password}
        error={errors.password ? true : false}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        style={{ margin: "10px 0" }}
        fullWidth
      />
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm New Password"
        helperText={errors.confirmPassword}
        error={errors.confirmPassword ? true : false}
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        style={{ margin: "10px 0" }}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        style={{ width: "100%", margin: "30px 0" }}
        disabled={loading}
        onClick={handleSubmit}
      >
        Reset Password
      </Button>
      <AlertModal
        open={alertState.open}
        onClose={handleAlertClose}
        message={alertState.message}
        color={alertState.color}
      />
    </FullPageLayout>
  );
};

export default PasswordReset;
