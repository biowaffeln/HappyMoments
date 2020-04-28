import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import "./tailwind.css";

// Create main element
const mainElement = document.createElement("div");
document.body.appendChild(mainElement);

// Render components
ReactDOM.render(<App />, mainElement);
