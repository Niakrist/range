import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Range from "./components/Range";

const App: React.FC = () => {
  const min: number = 0;
  const max: number = 100;

  return (
    <div className="container">
      <Range min={min} max={max} />
    </div>
  );
};

export default App;
