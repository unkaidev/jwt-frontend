import React, { useEffect, useState } from 'react';
import "../Navigation/Nav.scss";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


const Nav = (props) => {
    const [isShow, setIsShow] = useState(true);
    let location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login') {
            setIsShow(false)
        }
    }, [])
    return (
        <>
            {isShow === true &&
                <div>
                    <div className="topnav">
                        <NavLink to="/" exact>Home</NavLink>
                        <NavLink to="/users">Users</NavLink>
                        <NavLink to="/projects">Projects</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </div>
                </div>
            }
        </>
    );

}

export default Nav;