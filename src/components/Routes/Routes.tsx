import { Switch, Route } from "react-router";
import CSS from "csstype";
import Curtain from "../Curtain/Curtain";
import PrivateRoute from "./PrivateRoute";
import Game from "../Game/Game";

const Routes = () => {
  const NotFoundStyle: CSS.Properties = {
    textAlign: "center",
    width: "50%",
    height: "20%",
    position: "absolute",
    inset: 0,
    margin: "auto",
  };

  return (
    <Switch>
      <PrivateRoute
        path="/"
        publicComponent={Curtain}
        privateComponent={Game}
      />
      <Route
        path="*"
        component={() => <h1 style={NotFoundStyle}>404 NOT FOUND</h1>}
      />
    </Switch>
  );
};

export default Routes;
