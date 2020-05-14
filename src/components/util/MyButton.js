import React from "react";
import PropTypes from "prop-types";

// Mui stuff
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const MyButton = ({ children, onClick, tip }) => (
  <Tooltip title={tip} placement="top">
    <IconButton onClick={onClick}>{children}</IconButton>
  </Tooltip>
);

MyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  tip: PropTypes.string.isRequired,
};

export default MyButton;
