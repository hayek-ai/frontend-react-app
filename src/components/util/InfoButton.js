import React, { useState } from "react";
import PropTypes from "prop-types";

// Mui stuff
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
}));

const InfoButton = ({ title, text }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const body = (
    <div className={classes.paper}>
      <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </div>
  );
  return (
    <React.Fragment>
      <IconButton size="small" onClick={() => setOpen(true)}>
        <InfoIcon fontSize="inherit" />
      </IconButton>
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {body}
      </Modal>
    </React.Fragment>
  );
};

InfoButton.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default InfoButton;
