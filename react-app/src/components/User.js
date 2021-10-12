import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAllImages } from '../store/image';
import ImageComponent from './Images/ImageComponent';
import { addFollow, deleteFollow, setAllUsers } from '../store/session';

function User() {
  const { userId }  = useParams();
  const dispatch = useDispatch()

  const curUser = useSelector((state) => state.session.user)
  const images = useSelector((state) => state.images)
  const usersImages = images.filter((image) => image.user_id === +userId)

  const currentPagesUser = useSelector((state) => state?.session?.allUsers?.filter((user) => user.id === +userId)[0])

  useEffect(() => {
    dispatch(setAllImages())
    dispatch(setAllUsers())
  }, [dispatch])

  const addOrRemoveFollow = (e) => {
    e.preventDefault()
    const followObj = {
      current_user_id: curUser.id,
      user_to_follow_id: +userId,
    }
    if (currentPagesUser?.followers?.includes(curUser.id)) {
        dispatch(deleteFollow(followObj))
    } else {
        dispatch(addFollow(followObj))
    }
  }


  if (!curUser) {
    return null;
  }

  return (
    <>
    <div>
        <form onSubmit={addOrRemoveFollow}>
            {currentPagesUser?.followers?.includes(curUser.id) ? <button>Unfollow</button> : <button>follow</button>}
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
