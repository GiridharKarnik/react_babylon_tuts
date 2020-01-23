import React from "react";
import "./App.css";

import BouncingBall from "./components/BouncingBall";
import WoodenBox from "./components/WoodenBox";

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <WoodenBox /> */}
      <BouncingBall/>
    </div>
  );
};

export default App;
