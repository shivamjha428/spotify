import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './image/logo.png'
import './Navbar.css'

const Navbar = () => {

  let logout=()=> {
    localStorage.clear()
    window.history.forward()
  }
  return (
    <div className='navbar_container'>
        <div className='navbar_container_2'>
        <div className='nav_logo'><img className='nav_logo' src={Logo} alt="logo"/></div>
        <div>
            <ul className='nav_ul'>
            <NavLink to='/song'><li className='nav_list'>Songs</li></NavLink>
            <NavLink to='/artist'><li className='nav_list'>Artists</li></NavLink>
            <NavLink to='/'><li className='nav_list' onClick={logout}>Logout</li></NavLink>
            </ul>
        </div>
        </div>
        
    </div>
    
  )
}

export default Navbar