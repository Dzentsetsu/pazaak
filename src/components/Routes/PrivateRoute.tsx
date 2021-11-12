import { cp } from "fs";
import React, { ReactChild, ReactElement, ReactNode } from "react";
import { Route, Redirect } from "react-router";

let auth = {
  isAuthed: false,
  isAuthenticated() {
    return window.localStorage.getItem("name")?.includes("Dzen")
      ? (function () {
          // console.log("Authenticated!");
          return true;
        })()
      : (function () {
          console.log("Not Authenticated!");
          return false;
        })();
  },
};

const PrivateRoute = (props?: any) => {
  let {
    publicComponent: PublicComponent,
    path,
    privateComponent: PrivateComponent,
  } = props;
  return (
    <Route
      path={path}
      render={() => {
        return auth.isAuthenticated() ? (
          <PrivateComponent />
        ) : (
          <PublicComponent />
        );
      }}
    />
  );
};

export default PrivateRoute;
