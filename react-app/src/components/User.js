import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAllImages } from '../store/image';
import ImageComponent from './Images/ImageComponent';
import { addFollow } from '../store/follow';

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

  // <div>
  //     <form onSubmit={addOrRemoveFollow}>
  //         {likesByUser?.length ? <button>Dislike</button> : <button>Like</button>}
  //     </form>
  // </div>
  return (
    <>
    <div className="imageContainer">
            {usersImages?.map((image) => (
                <ImageComponent image={image} key={image.id} />
            ))}
        </div>
        </>
  );
}
export default User;
