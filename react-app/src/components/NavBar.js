import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import home from "../image_assets/home.svg"
import post from "../image_assets/post.svg"
import notifications from "../image_assets/notifications.svg"
import { setAllMyEvents } from '../store/event';
import NavBarMenu from './NavBarMenu';
import './SearchBar.css';
const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)
  const allUsers = useSelector((state) => state.session.allUsers)
  const events = useSelector((state) => state.events)

  const history = useHistory();

  useEffect(() => {
    let notificationButton = document.querySelector(".dropdown_menu")
    let content = document.querySelector(".dropdown_content")
    function handleClickOutside(event) {
      console.log("CONTENT", content.contains(event.target))
      if (notificationButton.contains(event.target) && !content.contains(event.target)) {
        content.classList.toggle("active")
      } else if (!notificationButton.contains(event.target) && !content.contains(event.target)){
        content.classList.remove("active")
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };

  }, [])


  useEffect(() => {
    let poll = setInterval(() => dispatch(setAllMyEvents(user.id)), 3000)
    return () => clearInterval(poll)
  }, [dispatch, user.id])

  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchInput("");
    let searchCriteria = searchInput.toLowerCase();
    history.push(`/results/${searchCriteria}`);
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const findUser = (userId) => {
    console.log("IN FIND USER", userId)
    return allUsers?.filter((user) => user.id === userId)[0]
  }

  return (
    <nav>
      <h1>
        <NavLink
          to="/"
          exact={true}
          activeClassName="active"
          className="logo button"
          draggable="false"
        >
          Kilogram
        </NavLink>
      </h1>
      <div className="navSpacer spacerLeft"></div>
      <div className="searchBarContainer">
        <input
          className="searchInput"
          type="text"
          onKeyPress={handleKeypress}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search"
        />
        <div className="searchIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="navSpacer spacerRight"></div>
      <div className="links">
        <NavLink
          to="/"
          exact={true}
          activeClassName="active"
          draggable="false"
        >
          <img
            src={home}
            alt="home"
            className="home_button button"
            draggable="false"
          />
        </NavLink>

        <div className="dropdown_menu">
          <img
            src={notifications}
            alt="home"
            className="home_button button"
            draggable="false"
          />

          <div className="dropdown_content">
            <div className="bubbleArrow"></div>
            <div className="dropdown_contentSubcontainer">
              {events.length > 0 ?
                events.map((event) =>
                (
                  <div key={event.id} className="singleNotification">
                    <div className="userInfo dropdown">
                      <div className="avatarContainer eventAvatar"><img src={findUser(event?.other_user_id)?.avatar} alt="eventAvatar" /></div>
                      <p className="eventMessage"> <span className="eventUser">{findUser(event?.other_user_id)?.username}</span> {event.message}</p>
                      {/* <button onClick={(e) => dispatch(deleteOneEvent(user.id, event.image_id))}>X</button> */}
                    </div>
                  </div>
                ))
                : "No new notifications!"}
            </div>
          </div>
        </div>


        <NavLink to='/images/new' exact={true} activeClassName='active' draggable="false"><img src={post} alt="postPicture" className='home_button button' draggable="false" /></NavLink>
        <NavBarMenu avatar={user?.avatar} userId={user?.id} />
      </div>
    </nav>
  );
};

export default NavBar;
