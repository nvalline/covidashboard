import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
import { NotificationProvider } from "./utils/NotificationContext";
import { AuthContext } from "./utils/AuthContext";
// import ChartContainer from "./components/ChartContainer";

function App() {
  const [authState, setAuthState] = useContext(AuthContext);

  return (
    <NotificationProvider>
      <Router>
        {window.innerWidth > 1080 ? <DesktopNav /> : <MobileNav />}
        {/* <Nav /> */}
        <Route exact path="/" component={Register} />  {/* Landing Page */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
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
        <Footer />
      </Router>
    </NotificationProvider>
  );
}

export default App;
