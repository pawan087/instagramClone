import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAllImages } from '../store/image';
import ImageComponent from './Images/ImageComponent';
import { addFollow, deleteFollow, setAllUsers } from '../store/session';
import './user.css'
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
      <div className="profileTop">
          <div className="profileAvatarBox">
              <div className="profileAvatarContainer">
                  {/* <img src={image?.user?.avatar} alt="" /> */}
              </div>
          </div>
          <div className="profileBox">
              <div className="profileNameAndButtons">
                  <div className="profileName">
                      USERNAME GOES HERE
                  </div>
                  <div className="profileButtons">
                      <form onSubmit={addOrRemoveFollow}>
                          {currentPagesUser?.followers?.includes(curUser.id) ? <button>Unfollow</button> : <button>follow</button>}
                      </form>
                  </div>
              </div>
              <div className="profileCounts">
                  <div className="profilePosts">#### Posts</div>
                  <div className="profileFollowers">#### Followers</div>
                  <div className="profileFollowing">#### Following</div>
              </div>
              <div className="profileName">
                  NAME GOES HERE (optional)
              </div>
              <div className="profileBio">
                  BIO GOES HERE
              </div>
              <div>
                FOLLOWED BY GOES HERE
              </div>
          </div>
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
