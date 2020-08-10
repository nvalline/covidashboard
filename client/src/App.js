import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import DesktopNav from "./components/DesktopNav/DesktopNav";
import MobileNav from "./components/MobileNav/MobileNav";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewEvent from "./pages/NewEvent";
import ExistingEvents from "./pages/ExistingEvents";
import CurrentData from "./pages/CurrentData";
import TestingSites from "./pages/TestingSites";
import Settings from "./pages/Settings";
import { NotificationProvider } from "./utils/NotificationContext";
import { AuthContext } from "./utils/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import API from "./utils/API";

import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

toast.configure();

API.convertCounties();

function App() {
  const [authState, setAuthState] = useContext(AuthContext);

  const userId = localStorage.getItem("userId");
  let isAuthenticated = localStorage.getItem("isAuthenticated");
  isAuthenticated = JSON.parse(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated === true && userId) {
      setAuthState({ isAuthenticated, userId });
    } else {
      setAuthState({ isAuthenticated: false, userId: null });
    }

  }, [isAuthenticated, setAuthState, userId]);

  const handleLogout = event => {
    axios
      .get("/auth/logout")
      .then(res => {
        const newAuthState = { isAuthenticated: false };
        toast.warn(res.data.msg);
        localStorage.setItem("isAuthenticated", false);
        localStorage.setItem("userId", null);
        setAuthState(newAuthState);
      })
      .catch(err => console.log(err));
  };

  const loginRedirect = () => {
    toast.warn("Please login");
    return <Redirect to="/login" />;
  };

  return (
    <NotificationProvider>
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          pauseOnHover={false}
        />
        {window.innerWidth > 1080 ? (
          <DesktopNav handleLogout={handleLogout} />
        ) : (
          <MobileNav handleLogout={handleLogout} />
        )}
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/">
            {authState.isAuthenticated === true ? <Home /> : <Register />}
          </Route>{" "}
          {/* Landing Page */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Login} />
          <Route exact path="/dashboard">
            {authState.isAuthenticated === true ? <Home /> : loginRedirect}
          </Route>
          <Route exact path="/new">
            {authState.isAuthenticated === true ? <NewEvent /> : loginRedirect}
          </Route>
          <Route exact path="/events">
            {authState.isAuthenticated === true ? (
              <ExistingEvents />
            ) : (
              loginRedirect
            )}
          </Route>
          <Route exact path="/current">
            {authState.isAuthenticated === true ? (
              <CurrentData />
            ) : (
              loginRedirect
            )}
          </Route>
          <Route exact path="/testing">
            {authState.isAuthenticated === true ? (
              <TestingSites />
            ) : (
              loginRedirect
            )}
          </Route>
          <Route exact path="/settings">
            {authState.isAuthenticated === true ? (
              <Settings />
            ) : (
              loginRedirect
            )}
          </Route>
        </Switch>
      </Router>
    </NotificationProvider>
  );
}

export default App;
