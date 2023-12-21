import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './cssNavbar.css'

function NavBar()
{
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
      return (
        <>
          <nav className="navbar">
            <div className="nav-element">
              <div className="app-head">Cloudbook</div>
              <ul className='navbar-categories'>
                <li><Link to='/' className={location.pathname === '/'?'active':''}>home</Link></li>
                <li><Link to='/about' className={location.pathname === '/about'?'active':''}>About</Link></li>
              </ul>
              {/* <div className="search-container flex">
                <input className="search-bar" placeholder='Search'></input>
                <button className="search-btn">Search</button>
              </div> */}
              {!localStorage.getItem('token') ? <div className="users">
                <Link className='signup'to="/signup">Sign up</Link>
                <Link className='login' to="/login">Login</Link>
              </div> : <button className='logout' onClick={handleLogout} >Logout<i className="fa-solid fa-right-from-bracket"></i></button>}
            </div>
          </nav>
        </>
      );
}

export default NavBar