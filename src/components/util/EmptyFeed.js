import React from "react";
import PropTypes from "prop-types";

// Mui stuff
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import Typography from "@material-ui/core/Typography";

const EmptyFeed = ({ message }) => {
  return (
    <div
      style={{
        width: "100%",
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <SentimentVeryDissatisfiedIcon fontSize="large" />
      <br />
      <Typography variant="subtitle1">{message}</Typography>
    </div>
  );
};

EmptyFeed.propTypes = {
  message: PropTypes.string.isRequired,
};

export default EmptyFeed;
