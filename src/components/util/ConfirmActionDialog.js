import React from "react";
import PropTypes from "prop-types";

// Mui stuff
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const ConfirmActionDialog = (props) => {
  const {
    open,
    onClose,
    title,
    prompt,
    cancelButtonText,
    onCancelClick,
    confirmButtonText,
    onConfirmClick,
  } = props;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>{prompt}</DialogContent>
      <br />
      <DialogActions>
        <Button autoFocus onClick={onCancelClick} variant="outlined">
          {cancelButtonText}
        </Button>
        <Button onClick={onConfirmClick} variant="contained" color="primary">
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmActionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  cancelButtonText: PropTypes.string.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  confirmButtonText: PropTypes.string.isRequired,
  onConfirmClick: PropTypes.func.isRequired,
};

export default ConfirmActionDialog;
