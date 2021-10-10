import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAllImages } from '../store/image';
import ImageComponent from './Images/ImageComponent';

function User() {
  const { userId }  = useParams();
  const dispatch = useDispatch()
  
  const [user, setUser] = useState({});

  const images = useSelector((state) => state.images)
  const usersImages = images.filter((image) => image.user_id === +userId)
  
  useEffect(() => {
    dispatch(setAllImages())
  }, [dispatch])

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className="imageContainer">
            {usersImages?.map((image) => (
                <ImageComponent image={image}/>
            ))}
        </div>
  );
}
export default User;
