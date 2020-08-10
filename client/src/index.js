import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from "./utils/AuthContext";
import { EventsProvider } from "./utils/EventsContext";

ReactDOM.render(
    <AuthProvider>
        <Suspense fallback={<p>Loading...</p>}>
            <EventsProvider>
                <App />
            </EventsProvider>
        </Suspense>
    </AuthProvider>,
    document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();