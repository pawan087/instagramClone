
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import home from "../image_assets/home.svg"


const NavBar = () => {

  const user = useSelector((state) => state.session.user)
  
  return (
    <nav>
      <h1>
        <NavLink to='/' exact={true} activeClassName='active' className="logo">Kilogram</NavLink>
      </h1>
      <div className="links">
        {!user?.id && <NavLink to='/login' exact={true} activeClassName='active'>Login</NavLink>}
        {!user?.id && <NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>}
        {user?.id && <NavLink to='/' exact={true} activeClassName='active'><img src={home} alt="home" className="home_button" /></NavLink>}
        <LogoutButton />
        {user?.id && <NavLink to='/images/new' exact={true} activeClassName='active'>Post an Image</NavLink>}
      </div>
    </nav>
  );
}

export default NavBar;
