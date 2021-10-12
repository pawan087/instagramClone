import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAllImages } from '../store/image';
import ImageComponent from './Images/ImageComponent';
import { addFollow, setFollows, deleteFollow } from '../store/follow';

function User() {
  const { userId }  = useParams();
  const dispatch = useDispatch()

  const [user, setUser] = useState({});
  const [alreadyFollowing, setAlreadyFollowing] = useState(false);
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

  // if (follows.followers) {
  //   for (let id of follows?.followers) {
  //     if (id === curUser?.id) {
  //       alreadyFollowing = true
  //     }
  //   }
  // }

  // follows?.followers.forEach(id => id === curUser?.id ? alreadyFollowing = true : null)
  useEffect(() => {
    if(curUser?.following.includes(+userId)){
      setAlreadyFollowing(true)
    }
  }, [])


  const addOrRemoveFollow = (e) => {
    e.preventDefault()
    console.log('curUser', curUser.id)
    console.log('userId', userId)
    const followObj = {
      current_user_id: curUser.id,
      user_to_follow_id: +userId,
    }
    if (alreadyFollowing) {
        console.log('UNFOLLOW')
        dispatch(deleteFollow(followObj))
    } else {
        console.log('FOLLOW')
        dispatch(addFollow(followObj))
    }
  }


  if (!user) {
    return null;
  }

  return (
    <>
    <div>
        <form onSubmit={addOrRemoveFollow}>
            {!alreadyFollowing ? <button>Follow</button> : <button>Unfollow</button>}
        </form>
    </div>
    <div className="imageContainer">
            {usersImages?.map((image) => (
                <ImageComponent image={image} key={image.id} />
            ))}
        </div>
        </>
  );
}
export default User;
