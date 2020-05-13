import React from "react";
import { Route, Redirect } from "react-router-dom";

/*
 * Passed a "conditionToRenderComponent" prop.  If condition true, renders component.
 * Else, redirects to specified "redirectPath"
 */
const CustomRoute = ({
  component: Component,
  conditionToRenderComponent,
  redirectPath,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        conditionToRenderComponent ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectPath} />
        )
      }
    />
  );
};

export default CustomRoute;
