import React from "react";
import "./App.css";

import { Switch, Route, Link } from "react-router-dom";

import BouncingBall from "./components/BouncingBall";
import BallAndFloor from "./components/BallAndFloor";
import WoodenBox from "./components/WoodenBox";
import WoodPlane from "./components/WoodPlane";

const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        <nav>
          <ul>
            <li><Link to="/">WoodPlane</Link></li>
            <li><Link to="/ballAndFloor">Ball and Floor</Link></li>
            <li><Link to="/woodenBox">Wooden Box</Link></li>
            <li><Link to="/bouncingBall">Bouncing Ball</Link></li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route exact path="/" component={WoodPlane}></Route>
        <Route exact path="/bouncingBall" component={BouncingBall} />
        <Route exact path="/ballAndFloor" component={BallAndFloor} />
        <Route exact path="/woodenBox" component={WoodenBox} />
      </Switch>
    </div>
  );
};

export default App;
