import React, { Fragment, Component, useState } from "react";
import {NavLink} from "react-router-dom"
import '../styles/NavBar.css';

const Navbar = () => {
    return(
        <Fragment>
            <div className="topnav">
                <NavLink className="active" to="/">Fuiyoh</NavLink>
            </div>
        </Fragment>
    )
}

export default Navbar