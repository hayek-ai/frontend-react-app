import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

/*
 * Makes sure user is authenticated and confirmed before rendering component
 * If user is authenticated but not confirmed, redirects to confirmation page
 * If user is not authenticated, redirects to landing page
 */

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      user.isAuthenticated && user.isConfirmed ? (
        <Component {...props} />
      ) : user.isAuthenticated ? (
        <Redirect to={`/confirm`} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PrivateRoute);
