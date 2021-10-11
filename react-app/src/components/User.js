import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAllImages } from '../store/image';
import ImageComponent from './Images/ImageComponent';
import { addFollow, setFollows } from '../store/follow';

function User() {
  const { userId }  = useParams();
  const dispatch = useDispatch()

  const [user, setUser] = useState({});
  const curUser = useSelector((state) => state.session.user)
  const images = useSelector((state) => state.images)
  const follows = useSelector((state) => state.follows)
  const usersImages = images.filter((image) => image.user_id === +userId)

  useEffect(() => {
    dispatch(setAllImages())
    dispatch(setFollows(userId))
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


  let alreadyFollowing = false;

  if (follows.followers) {
    for (let id of follows?.followers) {
      if (id === curUser?.id) {
        alreadyFollowing = true
      }
    }
  }

  // follows?.followers.forEach(id => id === curUser?.id ? alreadyFollowing = true : null)

  console.log(alreadyFollowing)




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
