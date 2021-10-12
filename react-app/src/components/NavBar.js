
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
        <NavLink to='/' exact={true} activeClassName='active' className="logo button" draggable="false">Kilogram</NavLink>
      </h1>
      <div className="links">
        {!user?.id && <NavLink to='/login' exact={true} activeClassName='active' className="button">Login</NavLink>}
        {!user?.id && <NavLink to='/sign-up' exact={true} activeClassName='active' className="button">Sign Up</NavLink>}
        <LogoutButton />
        {user?.id && <NavLink to='/' exact={true} activeClassName='active' draggable="false"><img src={home} alt="home" className="home_button button" draggable="false" /></NavLink>}
        {user?.id && <NavLink to='/images/new' exact={true} activeClassName='active' draggable="false"><img src={post} alt="postPicture" className='home_button button' draggable="false" /></NavLink>}
        {user?.id && <NavLink to={`/users/${user.id}`} exact={true} activeClassName='active' draggable="false">
          <div className="avatarContainer button">
            <img className='' src={user.avatar} alt="user's avatar" draggable="false" />
          </div>
        </NavLink>}

      </div>
    </nav>
  );
}

export default NavBar;
