
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import home from "../image_assets/home.svg"
import post from "../image_assets/post.svg"
import notifications from "../image_assets/notifications.svg"
import { deleteOneEvent, setAllMyEvents, startPolling } from '../store/event';



const NavBar = () => {
  
  useEffect(() => {
    let notificationButton = document.querySelector(".dropdown_menu")
    let content = document.querySelector(".dropdown_content")
    notificationButton.addEventListener(("click"), (e) => {
      content.classList.toggle("active")
    })
  }, [])


  // useEffect(() => {
  //   dispatch(startPolling(user.id))
  //   return clearInterval(startPolling(user.id))
  // },[])

  
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)
  const allUsers = useSelector((state) => state.session.allUsers)
  const events = useSelector((state) => state.events)
  
  
  useEffect(() => {
    dispatch(setAllMyEvents(user.id))
  },[dispatch])
  
  const findUser = (userId) => {
    return allUsers?.filter((user) => user.id === userId)[0]
  }
  
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

        {user?.id && (
          <div className='dropdown_menu'>
            <img src={notifications} alt="home" className="home_button button" draggable="false" />
            <div className="dropdown_content">
              {events.length > 0 ? 
                events.map((event) => 
                  (
                    <div key={event.id}>
                      <div className="userInfo">
                        <div className="avatarContainer"><img src={findUser(event?.other_user_id)?.avatar} alt="eventAvatar" /></div>
                        <p> <span className="eventUser">{findUser(event?.other_user_id)?.username}</span> {event.message}</p>
                        {/* <button onClick={(e) => dispatch(deleteOneEvent(user.id, event.image_id))}>X</button> */}
                      </div>
                    </div>
                  ))
                  : "No new notifications!"}
            </div>
          </div>
        )}
        
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
