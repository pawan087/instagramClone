import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addComment, deleteOneComment, deleteOneImage } from "../../../store/image"
import { setAllLikes } from "../../../store/like"
import { addLike, deleteOneLike } from '../../../store/like'

import { NavLink, useHistory } from "react-router-dom"
import liked from '../../../image_assets/liked.svg'
import unliked from '../../../image_assets/unliked.svg'
import '../images.css'

const ImageComponent = ({ image }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    const likes = useSelector((state) => state.likes)
    const [commentBody, setCommentBody] = useState('')
    const [commentImageId, setCommentImageId] = useState(0)
    const [animation, setAnimation] = useState(0)
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
        dispatch(setAllLikes())
    }, [dispatch])

    return (
        <div className="imageCard" key={image?.id}>

            {/* IMAGE OWNER USERNAME */}
            <div className="titleContainer">
                <div className="avatarContainer">
                    <img src={image?.user?.avatar} alt="" />
                </div>
                <p className="image_username"><NavLink to={`/users/${image?.user_id}`}>{image?.user?.username}</NavLink></p>
            </div>

            {/* IMAGE IDENTIFICATION */}
            {/* <h2><NavLink to={`/images/${image?.id}`}>{image?.title}</NavLink></h2> */}

            {/* IMAGE CONTROLS */}
            {user?.id === image?.user_id ? <button onClick={handleDelete}>DELETE</button> : false}
            {user?.id === image?.user_id ? <button onClick={(e) => history.push(`/images/${image?.id}/edit`)}>EDIT</button> : false}

            {/* IMAGE ITSELF */}
            <div className="individualImage" onClick={() => history.push(`/images/${image?.id}`)}>
                <img src={image?.img_url} alt="anImage" />
            </div>

            {/* IMAGE LIKES */}
            <div className="likes_container">
                <form onSubmit={addOrRemoveLike}>
                    {likesByUser?.length ?
                        <button>
                            <img src={liked} alt="liked" className="liked" onClick={() => setAnimation(1)} onAnimationEnd={() => setAnimation(0)} animation={animation} />
                        </button> :
                        <button>
                            <img src={unliked} alt="unliked" className="unliked" onClick={() => setAnimation(1)} onAnimationEnd={() => setAnimation(0)} animation={animation} />
                        </button>}
                </form>
                <div>
                    {thisPicturesLikes?.length}
                    {thisPicturesLikes?.length === 1 ? ' like' : ' likes'}
                </div>
            </div>

            {/* IMAGE CAPTION */}
            <div className="caption">
                {image?.caption && <p className="caption_username"><NavLink to={`/users/${image?.user_id}`}>{image?.user?.username}</NavLink></p>}
                <p>{image?.caption}</p>
            </div>



            {/* HASHTAG LIST */}
            <div className="hastagList">
                {image?.hashtags?.map((tag) => {
                    return (
                        <button key={tag.id} onClick={() => history.push(`/results/${tag}`)}>
                            {tag}
                        </button>

                    )
                })}
            </div>

            {/* COMMENT LIST */}
            <div className="commentList">
                {image?.comments?.comments.map((comment) => (
                    <div key={comment.id}>
                        <p className="comment_username"><NavLink to={`/users/${comment.user_id}`}> {comment.user.username} </NavLink></p>
                        <p>{comment.body}</p>
                        {user?.id === comment?.user_id ? <button onClick={(e) => dispatch(deleteOneComment(comment.id))}>DELETE</button> : false}
                        {user?.id === comment?.user_id ? <button onClick={(e) => history.push(`/images/${image.id}/comments/${comment.id}`)}>EDIT</button> : false}

                    </div>
                ))}
            </div>



            {/* CREATE A COMMENT FORM */}
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
