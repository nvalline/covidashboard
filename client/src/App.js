import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewEvent from "./pages/NewEvent";
import ExistingEvents from "./pages/ExistingEvents";
import CurrentData from "./pages/CurrentData";
import TestingSites from "./pages/TestingSites";

function App() {
  return ( 
    <Router>
        <Header/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Home}/>  {/* Landing Page */}
        <Route exact path="/new" component={NewEvent}/>
        <Route exact path="/events" component={ExistingEvents}/>
        <Route exact path="/current" component={CurrentData}/>
        <Route exact path="/testing" component={TestingSites}/>
        <Footer/>
    </Router>
  );
}

export default App;
