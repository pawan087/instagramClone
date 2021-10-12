import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import logoutButton from "../../image_assets/logout.svg"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  const user = useSelector((state) => state.session.user)

  const logoutStyling = {
    backgroundColor: 'black',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px'
  }

  if (user !== null) {
    return <p onClick={onLogout} style={{ cursor: "pointer" }}>
      <p style={logoutStyling}>Log Out</p>
    </p>
  } else {
    return null
  }
};

export default LogoutButton;
