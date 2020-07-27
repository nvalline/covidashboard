import React from "react";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="#">
                    COVID-19 TRACKER
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login">Login/SignUp</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/new">New Event</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/events">My Events</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/current">Current Data</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/testing">Testing Sites</a>
                        </li>
                    </ul>
                </div>
        </nav>
    )
}

export default Header;