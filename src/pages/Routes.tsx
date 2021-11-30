import { Switch, Route } from "react-router";
import CSS from "csstype";
import Home from "../components/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Game from "../components/Game/Game";
import Wrapper from "../components/MusicPlayer/Wrapper";

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
      {/* <PrivateRoute path="/" publicComponent={Home} privateComponent={Game} /> */}
      <Route exact path="/" component={Home} />
      <Route exact path="/againstAI" component={Game} />
      <Route exact path="/mp" component={Wrapper} />
      <Route exact path="/againstPlayer" component={() => <h1 style={NotFoundStyle}>NOT IMPLEMENTED YET</h1>} />
      <Route path="*" component={() => <h1 style={NotFoundStyle}>404 NOT FOUND</h1>} />
    </Switch>
  );
};

export default Routes;
