import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { setAllImages } from '../store/image';
import ImageTileComponent from './Images/ImageTileComponent'
import { addFollow, deleteFollow, setAllUsers } from '../store/session';
import './user.css'
import followed from "../image_assets/followed.svg"
import settings from "../image_assets/settings.svg"

function User() {
  const { userId }  = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const curUser = useSelector((state) => state.session.user)
  const images = useSelector((state) => state.images)
  const usersImages = images.filter((image) => image.user_id === +userId)

  const currentPagesUser = useSelector((state) => state?.session?.allUsers?.filter((user) => user.id === +userId)[0])

  let followText = ""

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

  const editProfile = (e) => {
    e.preventDefault()
    history.push(`/users/${userId}/edit_profile`)
  }
  const editProfileModal = (e) => {
    e.preventDefault()
  }

  if (currentPagesUser?.following?.includes(curUser.id) && !currentPagesUser?.followers?.includes(curUser.id)){
    followText = "Follow Back";
  } else if (!currentPagesUser?.followers?.includes(curUser.id)){
    followText = "Follow";
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
                    {currentPagesUser && currentPagesUser?.id !== curUser?.id ?
                    <div className="profileButtonBox">
                        <form onSubmit={addOrRemoveFollow}>
                            {currentPagesUser?.followers?.includes(curUser.id) ?
                                <button className="unfollow followingButton profileButton button"><img src={followed} alt="Unfollow" className="follow_icon" draggable="false"/></button> :
                                <button className="follow followingButton profileButton blueButton button">{followText}</button>}
                        </form>
                    </div> :
                    <div className="profileButtonBox">
                      <button onClick={editProfile} className="editProfile profileButton button">Edit Profile</button>
                      <button onClick={editProfileModal} className="editProfileModalButton button"><img src={settings} alt="Unfollow" className="follow_icon" draggable="false"/></button>
                    </div>
                    }
                </div>
                <div className="profileDetails">
                    <div className="profileCounts">
                        <div className="profilePosts"><div className="profileCountsNumber">{usersImages?.length}</div> posts</div>
                        <div className="profileFollowers"><div className="profileCountsNumber">{currentPagesUser?.followers.length}</div> followers</div>
                        <div className="profileFollowing"><div className="profileCountsNumber">{currentPagesUser?.following.length}</div> following</div>
                    </div>
                    <div className="profileUsernameAndPronoun">
                        <div className="profileName">{currentPagesUser?.fname} {currentPagesUser?.lname}</div> {currentPagesUser?.pronouns}
                    </div>
                    <div className="profileBio">
                        {currentPagesUser?.bio}
                    </div>
                    <div className="profileFollowedBy">Followed By <span className="profileFollowedByEmph">PEOPLE YOU KNOW</span> GOES HERE</div>
                </div>
            </div>
        </div>
        <div className="imageContainer tileContainer">
            <div className="profileSwitchBox">

            </div>
            {/* {usersImages?.map((image) => (
                <ImageComponent image={image} key={image.id} />
            ))} */}
            {usersImages?.map((image) => (
                <ImageTileComponent image={image} key={image.id} />
            ))}
        </div>
    </div>
  );
}
export default User;
