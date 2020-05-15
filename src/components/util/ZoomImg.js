import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// Mui stuff
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
}));

const ZoomImg = ({ src, alt, style }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <ButtonBase onClick={() => setOpen(true)}>
        <img src={src} alt={alt} style={style} />
      </ButtonBase>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <img src={src} alt={alt} />
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

ZoomImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};

export default ZoomImg;
