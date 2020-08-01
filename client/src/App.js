import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DesktopNav from "./components/DesktopNav/DesktopNav";
import MobileNav from "./components/MobileNav/MobileNav";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewEvent from "./pages/NewEvent";
import ExistingEvents from "./pages/ExistingEvents";
import CurrentData from "./pages/CurrentData";
import TestingSites from "./pages/TestingSites";

console.log(window)

function App() {
  return (
    <Router>
        {window.innerWidth > 1080 ? <DesktopNav /> : <MobileNav />}
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Home}/>  {/* Landing Page */}
        <Route exact path="/new" component={NewEvent}/>
        <Route exact path="/events" component={ExistingEvents}/>
        <Route exact path="/current" component={CurrentData}/>
        <Route exact path="/testing" component={TestingSites}/>
        <Footer />
    </Router>
  );
}

export default App;
