import React, { useRef } from "react";
import "./NavBarMenu.css";
import { useDetectOutsideClick } from "./NavBarOutsideClick";
import LogoutButton from "./auth/LogoutButton";
import profile from "../image_assets/profile.svg";
import bookmark from "../image_assets/bookmark.svg";
import { NavLink } from 'react-router-dom';
import settings from '../image_assets/settings.svg';
/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
 */

export default function NavBarMenu(avatar, userId) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  console.log(avatar);

  return (
    <div className="dropDownContainer">
      <div className="avatarContainer navAvatar" onClick={onClick}>
        <img src={avatar?.avatar} alt="User avatar" draggable="false" />
      </div>

      <div
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <div className="bubbleArrow"></div>

        <ul>
          <li>
            <a className="avatarReroute" href={`/users/${avatar?.userId}`}>
              <img src={profile} alt="Profile Icon" draggable="false" />
              Profile
            </a>
          </li>

          <li>
            <NavLink className='avatarReroute' to={`/users/${userId}/edit_profile`}>
              <img src={settings} alt="Settings Icon" draggable="false" />
              Settings
            </NavLink>
          </li>
          <li className='borderTop'>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  );
}

// <li>
//   <NavLink className='avatarReroute' to={`/users/${userId}/edit_profile`}>
//     <img src={settings} alt="Settings Icon" draggable="false" />
//     Settings
//   </NavLink>
// </li>
