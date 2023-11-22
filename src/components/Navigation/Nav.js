import React, { useEffect, useState } from 'react';
import "../Navigation/Nav.scss";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';


const Nav = (props) => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                <div>
                    <div className="topnav">
                        <NavLink to="/" exact>Home</NavLink>
                        <NavLink to="/users">Users</NavLink>
                        <NavLink to="/projects">Projects</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </div>
                </div>
            </>
        )
    } else {
        return <></>
    }


}

export default Nav;