import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import home from "../image_assets/home.svg";
import post from "../image_assets/post.svg";
import notifications from "../image_assets/notifications.svg";
import { deleteOneEvent, startPolling } from "../store/event";
import "./SearchBar.css";
const NavBar = () => {
  useEffect(() => {
    let notificationButton = document.querySelector(".dropdown_menu");

    let content = document.querySelector(".dropdown_content");

    notificationButton.addEventListener("click", (e) => {
      content.classList.toggle("active");
    });
  }, []);

  // useEffect(() => {
  //   dispatch(startPolling(user.id))
  // },[])

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.session.allUsers);
  const events = useSelector((state) => state.events);

  const [searchInput, setSearchInput] = useState("");

  // onClick={() => history.push(`/results/${tag}`)}

  const findUser = (userId) => {
    return allUsers?.filter((user) => user.id === userId)[0];
  };

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

        {/*<div className="cancelIcon">
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>*/}
      </div>

      <div className="links">
        {!user?.id && (
          <NavLink
            to="/login"
            exact={true}
            activeClassName="active"
            className="button"
          >
            Login
          </NavLink>
        )}

        {!user?.id && (
          <NavLink
            to="/sign-up"
            exact={true}
            activeClassName="active"
            className="button"
          >
            Sign Up
          </NavLink>
        )}

        <LogoutButton />

        {user?.id && (
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
        )}

        {user?.id && (
          <div className="dropdown_menu">
            <img
              src={notifications}
              alt="home"
              className="home_button button"
              draggable="false"
            />

            <div className="dropdown_content">
              {events.length > 0
                ? events.map((event) => (
                    <div key={event.id}>
                      <div className="userInfo">
                        <div className="avatarContainer">
                          <img
                            src={findUser(event?.other_user_id)?.avatar}
                            alt="eventAvatar"
                          />
                        </div>

                        <p>
                          {" "}
                          <span className="eventUser">
                            {findUser(event?.other_user_id)?.username}
                          </span>{" "}
                          {event.message}
                        </p>
                        {/* <button onClick={(e) => dispatch(deleteOneEvent(user.id, event.image_id))}>X</button> */}
                      </div>
                    </div>
                  ))
                : "No new notifications!"}
            </div>
          </div>
        )}

        {user?.id && (
          <NavLink
            to="/images/new"
            exact={true}
            activeClassName="active"
            draggable="false"
          >
            <img
              src={post}
              alt="postPicture"
              className="home_button button"
              draggable="false"
            />
          </NavLink>
        )}

        {user?.id && (
          <NavLink
            to={`/users/${user.id}`}
            exact={true}
            activeClassName="active"
            draggable="false"
          >
            <div className="avatarContainer button">
              <img
                className=""
                src={user.avatar}
                alt="user's avatar"
                draggable="false"
              />
            </div>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
