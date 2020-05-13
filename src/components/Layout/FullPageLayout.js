import React from "react";
import PropTypes from "prop-types";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100vh",
    borderRadius: 0,
  },
  narrowContainer: {
    maxWidth: 425,
    margin: "auto",
    textAlign: "center",
    padding: 25,
    paddingTop: 50,
  },
  wideContainer: {
    maxWidth: 800,
    margin: "auto",
    padding: 25,
    paddingTop: 50,
  },
}));

const FullPageLayout = ({ children, containerType }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper elevation={0} className={classes.background}>
        <div className={classes[containerType]}>{children}</div>
      </Paper>
    </React.Fragment>
  );
};

FullPageLayout.propTypes = {
  containerType: PropTypes.string.isRequired,
};

export default FullPageLayout;
