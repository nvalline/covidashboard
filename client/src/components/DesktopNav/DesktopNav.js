import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";

import "./style.css";

function DesktopNav({ handleLogout }) {
    const [authState, setAuthState] = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg" >
            <a className="navbar-brand" href="/">
                COVID-19 TRACKER
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <i className="fa fa-home"></i>
                        <Link to={'/'} className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <i className="fa fa-plus"></i>
                        <Link to={"/new"} className="nav-link">New Event</Link>
                    </li>
                    <li className="nav-item">
                        <i className="fa fa-calendar-o"></i>
                        <Link to={"/events"} className="nav-link">My Events</Link>
                    </li>
                    <li className="nav-item">
                        <i className="fa fa-line-chart"></i>
                        <Link to={'/current'} className="nav-link">Current Data</Link>
                    </li>
                    <li className="nav-item">
                        <i className="fa fa-map-marker"></i>
                        <Link to={'/testing'} className="nav-link">Testing Locations</Link>
                    </li>
                </ul>
            </div>
            <div className="nav-item ml-auto">
                <i className="fa fa-sign-in"></i>
                {authState.isAuthenticated === false ?
                    <Link to={'/login'} className="nav-link">Login/SignUp</Link> :
                    <Link to={'/logout'} className="nav-link" onClick={() => handleLogout()}>Logout</Link>}
            </div>
        </nav>
    )
}

export default DesktopNav;