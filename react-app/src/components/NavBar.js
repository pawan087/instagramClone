
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';


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
        {user?.id && <NavLink to='/users' exact={true} activeClassName='active'>Users</NavLink>}
        <LogoutButton />
        <NavLink to='/images/new' exact={true} activeClassName='active'>Post an Image</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
