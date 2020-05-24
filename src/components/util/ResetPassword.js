import React, { useState } from "react";
import PropTypes from "prop-types";

// Mui stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ResetPassword = ({ handleSendPasswordResetLink }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    setOpen(false);
    handleSendPasswordResetLink(email);
  };

  return (
    <div>
      <Button color="primary" onClick={() => setOpen(true)}>
        Forgot Password?
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Reset your password.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email below and we'll send you an email with a link to
            reset your password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            style={{ width: "100px" }}
            onClick={() => setOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ width: "100px" }}
            onClick={handleSubmit}
            color="primary"
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ResetPassword.propTypes = {
  handleSendPasswordResetLink: PropTypes.func.isRequired,
};

export default ResetPassword;
