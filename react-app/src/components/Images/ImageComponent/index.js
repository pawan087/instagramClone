import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addComment, deleteOneComment, deleteOneImage } from "../../../store/image"
import { addLike, deleteOneLike } from '../../../store/like'
import { NavLink, useHistory } from "react-router-dom"
import liked from '../../../image_assets/liked.svg'
import unliked from '../../../image_assets/unliked.svg'
import '../images.css'
import ImageModal from "../ImageModal"
import CommentModal from "../CommentModal"
import tableDots from '../../../image_assets/tableDots.svg'
import personDots from '../../../image_assets/personDots.svg'
import { addEvent, deleteOneEvent } from "../../../store/event"
import bookmark from '../../../image_assets/bookmark.svg'
import saved from '../../../image_assets/saved.svg'
import { addSavedImage, deleteSavedImage, login, updateUser } from "../../../store/session"

const ImageComponent = ({ image }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    const likes = useSelector((state) => state.likes)
    const [commentBody, setCommentBody] = useState('')
    const [commentImageId, setCommentImageId] = useState(0)
    const [animateGrow, setAnimateGrow] = useState(0)
    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    let thisPicturesLikes = likes.filter(like => like?.image?.id === image?.id);
    let likesByUser = likes.filter(like => like?.image?.id === image?.id && like?.user?.id === user?.id)

    const usersSavedImages = useSelector((state) => state.session.user.saved_images)

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(updateUser(user.id))
    }, [dispatch])

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

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    const handleDelete = () => {
        dispatch(deleteOneImage(image.id))
        history.push("/")
    }

    const handleDeleteComment = (id) => {
        console.log(id)
        dispatch(deleteOneComment(id))
        setIsCommentOpen(false)
    }

    const addOrRemoveLike = (e) => {
        e.preventDefault()
        if (likesByUser.length) {
            dispatch(deleteOneLike(likesByUser[0]?.id))
            dispatch(deleteOneEvent(user.id, image.id))
        } else {
            const newLike = {
                user_id: user?.id,
                image_id: image?.id,
            }
            const newEvent = {
                our_user_id: image.user_id,
                other_user_id: user.id,
                message: "liked an image you posted.",
                image_id: image.id
            }
            dispatch(addLike(newLike))
            dispatch(addEvent(newEvent, user.id))
        }
    }

    // <button className='red' onClick={(e) => history.push(`/images/${image.id}/comments/${comment.id}`)}>Edit</button>

    return (
        <div className="imageCard" key={image?.id}>

            {/* IMAGE OWNER USERNAME AND IMAGE CONTROLS*/}
            <div className="titleContainer">
                <div className="userInfo">
                    <div className="avatarContainer">
                        <img src={image?.user?.avatar} alt="Avatar" draggable="false"/>
                    </div>
                    <p className="image_username"><NavLink to={`/users/${image?.user_id}`}>{image?.user?.username}</NavLink></p>
                </div>
                {user?.id === image?.user_id ?
                    <div>
                        <button className='modal' onClick={() => setIsImageOpen(true)} style={{ opacity: '1' }}><img src={personDots} alt='options' /></button>
                        <ImageModal open={isImageOpen} onClose={() => setIsImageOpen(false)}>
                            <button className='red' onClick={handleDelete}>Delete</button>
                            <button className='red' onClick={(e) => history.push(`/images/${image?.id}/edit`)}>Edit</button>
                        </ImageModal>
                    </div>
                    : false}
            </div>

            {/* IMAGE IDENTIFICATION */}
            {/* <h2><NavLink to={`/images/${image?.id}`}>{image?.title}</NavLink></h2> */}

            {/* IMAGE ITSELF */}
            <div className="individualImage" onClick={() => history.push(`/images/${image?.id}`)}>
                <img src={image?.img_url} alt="anImage" draggable="false" />
            </div>

            {/* IMAGE LIKES */}
            <div className="likes_container">
                <form onSubmit={addOrRemoveLike}>
                    {likesByUser?.length ?
                        <button>
                            <img src={liked} alt="liked" className="liked" onClick={() => setAnimateGrow(1)} onAnimationEnd={() => setAnimateGrow(0)} animategrow={animateGrow} />
                        </button> :
                        <button>
                            <img src={unliked} alt="unliked" className="unliked" onClick={() => setAnimateGrow(1)} onAnimationEnd={() => setAnimateGrow(0)} animategrow={animateGrow} />
                        </button>}
                    <img src={usersSavedImages?.includes(image?.id) ? saved : bookmark}
                        alt="bookmarkImage"
                        className="bookmarkButton"
                        onClick={() => !usersSavedImages?.includes(image?.id) ? dispatch(addSavedImage(user?.id, image?.id)) : dispatch(deleteSavedImage(user?.id, image?.id))}
                    />
                </form>
                <div>
                    {thisPicturesLikes?.length}
                    {thisPicturesLikes?.length === 1 ? ' like' : ' likes'}
                </div>

            </div>

            {/* IMAGE CAPTION */}
            <div className="caption" key={image?.id}>
                {image?.caption && <p className="caption_username"><NavLink to={`/users/${image?.user_id}`}>{image?.user?.username}</NavLink></p>}
                <p>{image?.caption}</p>
            </div>



            {/* HASHTAG LIST */}
            <div className="hastagList">
                {image?.hashtags?.map((tag, idx) => {
                    return (
                        <button onClick={() => history.push(`/results/${tag}`)} key={idx}>
                            {tag}
                        </button>

                    )
                })}
            </div>

            {/* COMMENT LIST */}
            <div className="commentList">
                {image?.comments?.comments.map((comment) => (
                    <div className='eachComment' key={comment.id}>
                        <div className="commentInfo">
                            <p className="comment_username"><NavLink to={`/users/${comment.user_id}`}> {comment.user.username} </NavLink></p>
                            <p className="commentBody">{comment.body}</p>
                        </div>
                        {user?.id === comment?.user_id ?
                            <>
                                <div>
                                    <button className='modal' onClick={() => setIsCommentOpen(true)}><img src={tableDots} alt='options' /></button>
                                    <CommentModal open={isCommentOpen} onClose={() => setIsCommentOpen(false)}>
                                        <button className='red' onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                    </CommentModal>
                                </div>
                            </>
                            : false}

                    </div>
                ))}
            </div>



            {/* CREATE A COMMENT FORM */}
            < div className="createComment" >
                <form onSubmit={handleSubmit}>
                    <textarea onKeyPress={handleKeypress} value={commentBody} onChange={(e) => {
                        setCommentBody(e.target.value)
                        setCommentImageId(image.id)
                    }}
                        placeholder='Add a Comment'></textarea>
                    <button onClick={() => setIsCommentOpen(false)}>Post</button>
                </form>
            </div>

        </div>
    )
}

export default ImageComponent
