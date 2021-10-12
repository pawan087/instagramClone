
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import home from "../image_assets/home.svg"
import post from "../image_assets/post.svg"



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
        <LogoutButton />
        {user?.id && <NavLink to='/' exact={true} activeClassName='active'><img src={home} alt="home" className="home_button" /></NavLink>}
        {user?.id && <NavLink to='/images/new' exact={true} activeClassName='active'><img src={post} alt="post image button" className='home_button' /></NavLink>}
        {user?.id && <NavLink to={`/users/${user.id}`} exact={true} activeClassName='active'>
          <div className="avatarContainer">
            <img className='' src={user.avatar} alt="user's avatar" />
          </div>
        </NavLink>}

      </div>
    </nav>
  );
}

export default NavBar;
