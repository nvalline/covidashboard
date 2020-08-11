import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";

import "./style.css";

function DesktopNav({ handleLogout }) {
    const [authState] = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg" >
            <a className="navbar-brand" href="/">
                COVID-19 TRACKER
            </a>
            <li className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fa fa-bars"></i>
            </li>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        
                        <Link to={'/'} className="nav-link"><i className="fa fa-home"></i> Home</Link>
                    </li>
                    <li className="nav-item">
                        
                        <Link to={"/new"} className="nav-link"><i className="fa fa-plus"></i> New Event</Link>
                    </li>
                    <li className="nav-item">
                        
                        <Link to={"/events"} className="nav-link"><i className="fa fa-calendar-o"></i> My Events</Link>
                    </li>
                    <li className="nav-item">
                        
                        <Link to={'/current'} className="nav-link"><i className="fa fa-line-chart"></i> Current Data</Link>
                    </li>
                    <li className="nav-item">
                        
                        <Link to={'/testing'} className="nav-link"><i className="fa fa-map-marker"></i> Testing Locations</Link>
                    </li>
                    <li className="nav-item">
                        
                        <Link to={'/settings'} className="nav-link"><i className="fa fa-wrench"></i> Settings</Link>
                    </li>
                </ul>
                <div className="nav-item ml-auto">
                    
                    {authState.isAuthenticated === false ?
                        <Link to={'/login'} className="nav-link"><i className="fa fa-sign-in" data-toggle="collapse"></i> Login/SignUp</Link> :
                        <Link to={'/logout'} className="nav-link" onClick={() => handleLogout()} data-toggle="collapse"><i className="fa fa-sign-in"></i> Logout</Link>}
                </div>
            </div>
        </nav>
    )
}

export default DesktopNav;