import React, { useEffect, useState } from 'react';
import "../Navigation/Nav.scss";
import { NavLink, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.svg'
import { logoutUser } from '../../services/userServices';
import { toast } from 'react-toastify';



const NavHeader = (props) => {
    const { user, logoutContext } = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();

    const handleLogout = async () => {
        let data = await logoutUser(); // clear cookies
        localStorage.removeItem('jwt'); // clear local storage
        logoutContext(); // clear user in context
        if (data && +data.EC === 0) {
            toast.success('Logout success')
            history.push('/login')
        } else {
            toast.error(data.EM)
        }
    }
    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                <div className='nav-header'>
                    <Navbar expand="lg" className="bg-header">
                        <Container>
                            <Navbar.Brand href="/">
                                <img
                                    alt=""
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />
                                <span className='brand-name'>Hi-school</span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">

                                    <NavLink to="/" exact className='nav-link'>Home</NavLink>
                                    <NavLink to="/users" className='nav-link'>Users</NavLink>
                                    <NavLink to="/roles" className='nav-link'>Roles</NavLink>
                                    <NavLink to="/group-role" className='nav-link'>Group-Role</NavLink>
                                    <NavLink to="/projects" className='nav-link'>Projects</NavLink>
                                    <NavLink to="/about" className='nav-link'>About</NavLink>

                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated === true ?
                                        <>
                                            <Nav.Item className='nav-link'>
                                                Welcome {user.account.username} !
                                            </Nav.Item>
                                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                                <NavDropdown.Item >Change Password</NavDropdown.Item>

                                                <NavDropdown.Divider />
                                                <NavDropdown.Item >
                                                    <span onClick={() => handleLogout()}>
                                                        Logout

                                                    </span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <NavLink to="/login" className='nav-link'>Login</NavLink>
                                    }

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div >

            </>
        )
    } else {
        return <></>
    }


}

export default NavHeader;