import React from "react";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";

const WithLoading = ({ children, loading }) => {
  const markup = loading ? (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <CircularProgress size={40} />
    </div>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
  return markup;
};

WithLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default WithLoading;
