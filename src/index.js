import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import HexGame from "./hex-game.js";

// ========================================

ReactDOM.render(
    <HexGame boardSize={9}/>, document.getElementById("root"));
