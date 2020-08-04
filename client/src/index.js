import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./utils/AuthContext";

ReactDOM.render(<AuthProvider><App /></AuthProvider>, document.getElementById("root"));
