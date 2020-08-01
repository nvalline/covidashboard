import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewEvent from "./pages/NewEvent";
import ExistingEvents from "./pages/ExistingEvents";
import CurrentData from "./pages/CurrentData";
import TestingSites from "./pages/TestingSites";
import { NotificationProvider } from "./utils/NotificationContext";
import ChartContainer from "./components/ChartContainer";

function App() {

  return (
    <NotificationProvider>
      <Router>
        <Nav />
        <Route exact path="/" component={Register} />  {/* Landing Page */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Home} />
        <Route exact path="/new" component={NewEvent} />
        <Route exact path="/events" component={ExistingEvents} />
        <Route exact path="/current" component={CurrentData} />
        <Route exact path="/testing" component={TestingSites} />
        <Footer />
      </Router>
    </NotificationProvider>
  );
}

export default App;
