import {FaSignInAlt, FaSignOutAlt, FaUser, FaPlusCircle, FaClone, FaSearch, FaCog, FaThLarge, FaUserCircle, FaGithub} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect } from 'react';
import { getByTitle } from '@testing-library/react';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {seller} = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')

    }

    const getEmail = () => {
        return (<><FaUserCircle  className='icon'/> <span> {seller.email}</span></>)
    }
    return(
        <header className='sticky-top border-bottom'>
        
        
            {seller ? (
                <>
                <Navbar bg="light" expand="lg" style={{width:"100%"}}>
                    <Container className='container-xxl'>
                        <Navbar.Brand>
                            <Link to='/' className='nav-link'>Marketplace</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="" style={{width:'100%'}}>
                                <Link to='/ads' className='nav-link'>
                                    <FaSearch className='icon'/>
                                    <span> Browse Ads</span>
                                </Link>
                                <Link to='/categories' className='nav-link'>
                                    <FaThLarge className='icon'/>
                                    <span> Browse Categories</span>
                                </Link>
                                <Link to='/new-ad' className='nav-link'>
                                    <FaPlusCircle className='icon'/> Post an Ad
                                </Link>
                                <a href='https://github.com/jpolina/marketplace-frontend' className='nav-link' target="_blank">
                                    <FaGithub className='icon'/> Source Code
                                </a>

                                <NavDropdown  className="email-dropdown" title={getEmail()} id="basic-nav-dropdown">
                                    <NavDropdown.Item as='div'>
                                        <Link to='/my-ads' className='nav-link'>
                                            <FaClone /> My Ads
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as='div'>
                                        <Link to='/account-settings' className='nav-link'>
                                            <FaCog /> Account Settings
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as='div'>
                                        <Link to='/' className='nav-link' onClick={onLogout}>
                                            <FaSignOutAlt /> Logout
                                        </Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                </>
            ) : (
                <>
                    <Navbar bg="light" expand="lg" style={{width:"100%"}}>
                    <Container className='container-fluid'>
                        <Navbar.Brand>
                            <Link to='/' className='nav-link'>Marketplace</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to='/ads' className='nav-link'>
                                <FaSearch className='icon'/> Browse Ads
                            </Link>
                            <Link to='/categories' className='nav-link'>
                                <FaThLarge className='icon'/> Browse Categories
                            </Link>
                            <Link to='/login' className='nav-link'>
                                <FaSignInAlt className='icon'/> Login
                            </Link>
                            <Link to='/register' className='nav-link  align-text-bottom'>
                                <FaUser className='icon'/> Register
                            </Link>
                                <a href='https://github.com/jpolina/marketplace-frontend' className='nav-link' target="_blank">
                                    <FaGithub className='icon'/> Source Code
                                </a>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                </>
            )}
            
        
        </header>
    )
}

export default Header