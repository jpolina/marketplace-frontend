import {FaSignInAlt, FaSignOutAlt, FaUser, FaPlusCircle, FaClone, FaSearch, FaCog, FaThLarge} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

//https://i.imgur.com/KHrRhWX.jpg

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {seller} = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')

    }
    return(
        <header>
        
        
            {seller ? (
                <>
                <Navbar bg="light" expand="lg" style={{width:"100%"}}>
                    <Container className='container-xxl'>
                        <Navbar.Brand>
                            <Link to='/' className='nav-link'>Online Marketplace</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to='/ads' className='nav-link'>
                                <FaSearch /> Browse Ads
                            </Link>
                            <Link to='/categories' className='nav-link'>
                                <FaThLarge /> Browse Categories
                            </Link>
                            <Link to='/new-ad' className='nav-link'>
                                <FaPlusCircle /> Post an Ad
                            </Link>

                            

                            
                            <NavDropdown  className="justify-content-end" title="My Account" id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <Link to='/my-ads' className='nav-link'>
                                        <FaClone /> My Ads
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to='/account-settings' className='nav-link'>
                                        <FaCog /> Account Settings
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >
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
                            <Link to='/' className='nav-link'>Online Marketplace</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to='/ads' className='nav-link'>
                                <FaSearch /> Browse Ads
                            </Link>
                            <Link to='/categories' className='nav-link'>
                                <FaThLarge /> Browse Categories
                            </Link>
                            <Link to='/login' className='nav-link'>
                                <FaSignInAlt /> Login
                            </Link>
                            <Link to='/register' className='nav-link  align-text-bottom'>
                                <FaUser /> Register
                            </Link>
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