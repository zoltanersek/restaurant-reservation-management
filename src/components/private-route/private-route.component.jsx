import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({allow, redirectLocation, component: Component, ...otherProps }) => {
  return (
    <Route
      {...otherProps}
      render={(props) =>
        allow ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: redirectLocation, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
