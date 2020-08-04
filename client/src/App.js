import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
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
import { NotificationProvider, NotificationContext } from "./utils/NotificationContext";
import { AuthContext } from "./utils/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ChartContainer from "./components/ChartContainer";

import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

toast.configure();

function App() {
  const [authState, setAuthState] = useContext(AuthContext);
  const [notificationState, setNotificationState] = useContext(NotificationContext);

  const handleLogout = (event) => {
    axios.get("/auth/logout")
      .then(res => {
        const newAuthState = { isAuthenticated: false };
        toast.warn(res.data.msg);
        setAuthState(newAuthState);
      })
      .catch(err => console.log(err));
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
        {window.innerWidth > 1080 ? <DesktopNav handleLogout={handleLogout} /> : <MobileNav handleLogout={handleLogout} />}
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" component={Register} />  {/* Landing Page */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Login} />
          <Route exact path="/dashboard">
            {authState.isAuthenticated === true ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/new">
            {authState.isAuthenticated === true ? <NewEvent /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/events">
            {authState.isAuthenticated === true ? <ExistingEvents /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/current">
            {authState.isAuthenticated === true ? <CurrentData /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/testing">
            {authState.isAuthenticated === true ? <TestingSites /> : <Redirect to="/login" />}
          </Route>
        </Switch>
        <Footer />
      </Router>
    </NotificationProvider>
  );
}

export default App;
