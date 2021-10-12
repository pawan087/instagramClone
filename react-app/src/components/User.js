import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAllImages } from '../store/image';
import ImageComponent from './Images/ImageComponent';
import { addFollow, deleteFollow, setAllUsers } from '../store/session';
import './user.css'
import follow from "../image_assets/follow.svg"
import followed from "../image_assets/followed.svg"

function User() {
  const { userId }  = useParams();
  const dispatch = useDispatch()

  const curUser = useSelector((state) => state.session.user)
  const images = useSelector((state) => state.images)
  const usersImages = images.filter((image) => image.user_id === +userId)

  const currentPagesUser = useSelector((state) => state?.session?.allUsers?.filter((user) => user.id === +userId)[0])

  console.log("currentPagesUser", currentPagesUser)
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
    <div className="profileContainer">
        <div className="profileTop">
            <div className="profileAvatarBox">
                <div className="profileAvatarContainer">
                    <img src={currentPagesUser?.avatar} alt="User Avatar" />
                </div>
            </div>
            <div className="profileBox">
                <div className="profileNameAndButtons">
                    <div className="profileUserName">
                        {currentPagesUser?.username}
                    </div>
                    <div className="profileButtonBox">
                        <form onSubmit={addOrRemoveFollow}>
                            {currentPagesUser?.followers?.includes(curUser.id) ?
                                <button className="unfollow followingButton profileButton button"><img src={followed} alt="Unfollow" className="follow_icon" draggable="false"/></button> :
                                <button className="follow followingButton profileButton button"><img src={follow} alt="Follow" className="follow_icon" draggable="false" /></button>}
                        </form>
                    </div>
                </div>
                <div className="profileDetails">
                    <div className="profileCounts">
                        <div className="profilePosts"><div className="profileCountsNumber">{usersImages?.length}</div> posts</div>
                        <div className="profileFollowers"><div className="profileCountsNumber">{currentPagesUser?.followers.length}</div> followers</div>
                        <div className="profileFollowing"><div className="profileCountsNumber">{currentPagesUser?.following.length}</div> following</div>
                    </div>
                    <div className="profileUsernameAndPro">
                        <div className="profileName">NAME GOES HERE</div> nouns go here (optional)
                    </div>
                    <div className="profileBio">
                        BIO GOES HERE
                    </div>
                    <div>
                      FOLLOWED BY PEOPLE YOU KNOW GOES HERE
                    </div>
                </div>
            </div>
        </div>
        <div className="imageContainer">
            <div className="profileSwitchBox">

            </div>
            {usersImages?.map((image) => (
                <ImageComponent image={image} key={image.id} />
            ))}
        </div>
    </div>
  );
}
export default User;
