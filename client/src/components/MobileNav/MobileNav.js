import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";

import "./style.css";

function MobileNav({ handleLogout }) {
    const [authState] = useContext(AuthContext);

    return (
        <nav className="navbar-ft fixed-bottom navbar-expand-lg">
            <div className="row">
                <div className="ft-icon">
                    <Link to={'/'} className="nav-link"><i className="fa fa-home"></i></Link>
                </div>
                <div className="ft-icon">
                    <Link to={'/current'} className="nav-link"><i className="fa fa-line-chart"></i></Link>
                </div>
                <div className="ft-icon">
                    <Link to={'/events'} className="nav-link"><i className="fa fa-calendar-o"></i></Link>
                </div>
                <div className="ft-icon">
                    <Link to={'/testing'} className="nav-link"><i className="fa fa-map-marker"></i></Link>
                </div>
                <div className="ft-icon">
                    <Link to={'/settings'} className="nav-link"><i className="fa fa-wrench"></i></Link>
                </div>
                <div className="ft-icon">
                    {authState.isAuthenticated === false ?
                        <Link to={'/login'} className="nav-link"><i className="fa fa-sign-in"></i></Link> :
                        <Link to={'/logout'} className="nav-link" onClick={() => handleLogout()}><i className="fa fa-sign-out"></i></Link>}
                </div>
            </div>
        </nav>


    )
}

export default MobileNav;