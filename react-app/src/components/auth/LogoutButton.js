import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  const user = useSelector((state) => state.session.user)

  if(user !== null){
    return <button onClick={onLogout}>Logout</button>;
  } else {
    return null
  }
};

export default LogoutButton;
