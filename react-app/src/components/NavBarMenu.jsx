import React, { useRef } from "react";
import "./NavBarMenu.css";
import { useDetectOutsideClick } from "./NavBarOutsideClick";
import LogoutButton from "./auth/LogoutButton";
/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
 */
export default function NavBarMenu(avatar, userId) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);
    return (
        <div className="dropDownContainer">
            <div className="avatarContainer navAvatar" onClick={onClick}>
                <img
                    src={avatar?.avatar}
                    alt="User avatar"
                />
            </div>
            <div
                ref={dropdownRef}
                className={`menu ${isActive ? "active" : "inactive"}`}
            >
                <ul>
                    <li>
                        <a className='avatarReroute' href={`/users/${avatar?.userId}`}>Profile</a>
                    </li>
                    <li>
                        <a className='avatarReroute' href="#">Saved</a>
                    </li>
                    <li className='borderTop'>
                        <LogoutButton />
                    </li>
                </ul>
            </div>
        </div>
    );
}
