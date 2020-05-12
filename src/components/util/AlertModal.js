import React from "react";
import PropTypes from "prop-types";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
  alert: {
    width: "98%",
    maxWidth: 600,
    outline: "none",
  },
}));

// *** color prop scheme ***
// "success" = green
// "error" = red
// "warning" = orange
// "info" = blue

const AlertModal = ({ open, onClose, message, color }) => {
  const classes = useStyles();
  return (
    <Modal className={classes.modal} open={open} onClose={onClose}>
      <Alert
        severity={color ? color : "success"}
        color={color ? color : "info"}
        className={classes.alert}
      >
        {message}
      </Alert>
    </Modal>
  );
};

AlertModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  color: PropTypes.string, // defaults to blue success message
};

export default AlertModal;
