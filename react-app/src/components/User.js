import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { setAllImages } from '../store/image';
import { deleteOneComment, deleteOneImage, addComment } from '../store/image';

function User() {
  const { userId }  = useParams();
  const dispatch = useDispatch()
  const history = useHistory
  
  const [user, setUser] = useState({});
  const [commentBody, setCommentBody] = useState('')
  const [commentImageId, setCommentImageId] = useState(0)

  const images = useSelector((state) => state.images)
  const usersImages = images.filter((image) => image.user_id === +userId)
  console.log(usersImages)
  
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

  const reset = () => {
    setCommentBody('')
    setCommentImageId(0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newComment = {
        user_id: user.id,
        image_id: commentImageId,
        body: commentBody
    }
    dispatch(addComment(newComment))
    reset()
  }

  return (
    <div>

      <ul>
        <li><strong>User Id</strong> {userId}</li>
        <li><strong>Username</strong> {user.username}</li>
        <li><strong>Email</strong> {user.email}</li>
      </ul>

      {usersImages.map((image) => 
        <div className="imageCard" key={image.id}>
        <h2>{image.title}</h2>
        <p>{image.caption}</p>
        <p>{image.user.username}</p>
        {user?.id === image.user_id ? <button onClick={(e) => dispatch(deleteOneImage(image.id))}>DELETE</button> : false}
        {user?.id === image.user_id ? <button onClick={(e) => history.push(`/images/${image.id}/edit`)}>EDIT</button> : false}
        <div key={image.id} className="individualImage">
            <img src={image.img_url} alt="anImage" />
        </div>
        <div className="commentList">
            {image?.comments?.comments.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.body}</p>
                    <p><em>{comment.user.username}</em></p>
                    {user?.id === comment?.user_id ? <button onClick={(e) => dispatch(deleteOneComment(comment.id))}>DELETE</button> : false}

                </div>
            ))}
        </div>
        <div className="createComment">
            <form onSubmit={handleSubmit}>
                <textarea 
                  value={commentBody} 
                  onChange={(e) => {
                    setCommentBody(e.target.value)
                    setCommentImageId(image.id)
                  }}
                  placeholder='Add a Comment'>
                </textarea>
                <button>Post</button>
            </form>
        </div>
    </div>
    )}
    </div>
  );
}
export default User;
