import React from "react";
import "./NavBar.css";

const NavBar = props => (

    <nav className="navbar sticky-top">
        <ul className=" nav navbar sticky-top">
            <li className="nav-item title"> New York Times Article Scrubber</li>
            <li className="nav-item sub-title">Search for and annotate articles</li>
        </ul>
    </nav>
);

export default NavBar;
