import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import CurrentData from "./components/pages/CurrentData";

function App() {
  return ( 
    <Router>
        <Header/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/current" component={CurrentData}/>
        <Route exact path="/landing" component={LandingPage}/>
        <Route exact path="/new" component={NewEvent}/>
        <Route exact path="/view" component={ExistingEvents}/>
        <Route exact path="/testing" component={TestingSites}/>
        <Footer/>
    </Router>
  );
}

export default App;
