import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from "./utils/AuthContext";
import { EventsProvider } from "./utils/EventsContext";
import { StateDataProvider } from "./utils/StateDataContext";
import { UserLocalProvider } from "./utils/UserLocalContext";
import { UserCountyProvider } from "./utils/UserCountyContext";

ReactDOM.render(
    <AuthProvider>
        <StateDataProvider>
            <UserLocalProvider>
                <UserCountyProvider>
                    <EventsProvider>
                        <App />
                    </EventsProvider>
                </UserCountyProvider>
            </UserLocalProvider>
        </StateDataProvider>
    </AuthProvider>,
    document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();