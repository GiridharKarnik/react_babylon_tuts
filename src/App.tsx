import React from "react";
import "./App.css";

import { Switch, Route, Link } from "react-router-dom";

import BouncingBall from "./components/BouncingBall";
import BallAndFloor from "./components/BallAndFloor";
import WoodenBox from "./components/WoodenBox";
import WoodPlane from "./components/WoodPlane";
import TennisCourt from "./components/TennisCourt";

const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        <nav>
          <ul>
            <li><Link to="/">TennisCourt</Link></li>
            <li><Link to="/woodPlane">WoodPlane</Link></li>
            <li><Link to="/ballAndFloor">Ball and Floor</Link></li>
            <li><Link to="/woodenBox">Wooden Box</Link></li>
            <li><Link to="/bouncingBall">Bouncing Ball</Link></li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route exact path="/" component={TennisCourt}></Route>
        <Route exact path="/woodPlane" component={WoodPlane}></Route>
        <Route exact path="/bouncingBall" component={BouncingBall} />
        <Route exact path="/ballAndFloor" component={BallAndFloor} />
        <Route exact path="/woodenBox" component={WoodenBox} />
      </Switch>
    </div>
  );
};

export default App;
