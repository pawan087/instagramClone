import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { setAllImages, addComment, deleteOneComment, deleteOneImage } from "../../../store/image"
import { addLike, deleteOneLike } from '../../../store/like'

import { NavLink, useHistory } from "react-router-dom"
import '../images.css'

const ImageComponent = ({ image }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    const likes = useSelector((state) => state.likes)
    const [commentBody, setCommentBody] = useState('')
    const [commentImageId, setCommentImageId] = useState(0)
    let thisPicturesLikes = likes.filter(like => like?.image?.id === image?.id);
    let likesByUser = likes.filter(like => like?.image?.id === image?.id && like?.user?.id === user?.id)

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

    const handleDelete = () => {
        dispatch(deleteOneImage(image.id))
        history.push("/")
    }

    const addOrRemoveLike = (e) => {
        e.preventDefault()
        if (likesByUser.length) {
            dispatch(deleteOneLike(likesByUser[0].id))
        } else {
            const newLike = {
                user_id: user.id,
                image_id: image.id,
            }
            dispatch(addLike(newLike))
        }
    }

    useEffect(() => {
        dispatch(setAllImages())
    }, [dispatch])

    return (
        <div className="imageCard">
            <h2><NavLink to={`/images/${image?.id}`}>{image?.title}</NavLink></h2>
            <p>{image?.caption}</p>
            <p><em><NavLink to={`/users/${image?.user_id}`}>{image?.user?.username}</NavLink></em></p>
            {user?.id === image?.user_id ? <button onClick={handleDelete}>DELETE</button> : false}
            {user?.id === image?.user_id ? <button onClick={(e) => history.push(`/images/${image?.id}/edit`)}>EDIT</button> : false}
            <div key={image?.id} className="individualImage" onClick={() => history.push(`/images/${image?.id}`)}>
                <img src={image?.img_url} alt="anImage" />
            </div>
            <div className="hastagList">
                {image?.hashtags?.map((tag) => {
                    return (
                        <button onClick={() => history.push(`/results/${tag}`)}>
                            {tag}
                        </button>

                    )
                })}
            </div>
            <div className="commentList">
                {image?.comments?.comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.body}</p>
                        <p><em> <NavLink to={`/users/${comment.user_id}`}> {comment.user.username} </NavLink> </em></p>
                        {user?.id === comment?.user_id ? <button onClick={(e) => dispatch(deleteOneComment(comment.id))}>DELETE</button> : false}
                        {user?.id === comment?.user_id ? <button onClick={(e) => history.push(`/images/${image.id}/comments/${comment.id}`)}>EDIT</button> : false}

                    </div>
                ))}
            </div>
            <div>
                <div>
                    {thisPicturesLikes?.length}
                    {thisPicturesLikes?.length === 1 ? ' like' : ' likes'}
                </div>
                <form onSubmit={addOrRemoveLike}>
                    {likesByUser?.length ? <button>Dislike</button> : <button>Like</button>}
                </form>
            </div>
            <div className="createComment">
                <form onSubmit={handleSubmit}>
                    <textarea value={commentBody} onChange={(e) => {
                        setCommentBody(e.target.value)
                        setCommentImageId(image.id)
                    }}
                        placeholder='Add a Comment'></textarea>
                    <button>Post</button>
                </form>
            </div>
        </div>
    )
}

export default ImageComponent
