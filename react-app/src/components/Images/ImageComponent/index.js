import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { setAllImages, addComment, deleteOneComment, deleteOneImage } from "../../../store/image"
import { NavLink, useHistory } from "react-router-dom"
import '../images.css'

const ImageComponent = ({image}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    const [commentBody, setCommentBody] = useState('')
    const [commentImageId, setCommentImageId] = useState(0)

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

    useEffect(() => {
        dispatch(setAllImages())
    }, [dispatch])

    return (
        <div className="imageCard">
                    <h2><NavLink to={`/images/${image?.id}`}>{image?.title}</NavLink></h2>
                    <p>{image?.caption}</p>
                    <p><em><NavLink to={`/users/${image?.user_id}`}>{image?.user?.username}</NavLink></em></p>
                    {user?.id === image?.user_id ? <button onClick={(e) => dispatch(deleteOneImage(image?.id))}>DELETE</button> : false}
                    {user?.id === image?.user_id ? <button onClick={(e) => history.push(`/images/${image?.id}/edit`)}>EDIT</button> : false}
                    <div key={image?.id} className="individualImage" onClick={() => history.push(`/images/${image?.id}`)}>
                        <img src={image?.img_url} alt="anImage" />
                    </div>
                    <div className="commentList">
                        {image?.comments?.comments.map((comment) => (
                            <div key={comment.id}>
                                <p>{comment.body}</p>
                                <p><em> <NavLink to={`/users/${comment.user_id}`}> {comment.user.username} </NavLink> </em></p>
                                {user?.id === comment?.user_id ? <button onClick={(e) => dispatch(deleteOneComment(comment.id))}>DELETE</button> : false}

                            </div>
                        ))}
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