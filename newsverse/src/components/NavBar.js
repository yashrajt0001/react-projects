import React from 'react'
import {Link} from 'react-router-dom'

function NavBar()
{
      return (
        <>
          <nav className="navbar">
            <div className="category-conainer flex">
              <div className="app-head">Newsverse</div>
              <ul className='navbar-categories'>
                <li><Link to='/'>home</Link></li>
                <li><Link to='/business'>business</Link></li>
                <li><Link to='/entertainment'>entertainment</Link></li>
                <li><Link to='/health'>health</Link></li>
                <li><Link to='/science'>science</Link></li>
                <li><Link to='/sports'>sports</Link></li>
                <li><Link to='/technology'>technology</Link></li>
              </ul>
            </div>
          </nav>
        </>
      );
}

export default NavBar