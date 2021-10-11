import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { setAllImages, editOneComment } from "../../../store/image"


const EditCommentForm = () => {

    
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(setAllImages())
    }, [dispatch])
    
    const images = useSelector((state) => state.images)
    const currentImage = images?.filter((image) => image?.id === +params.image_id)
    const currentComment = currentImage[0]?.comments?.comments[0]
    
    const [commentBody, setCommentBody] = useState(currentComment?.body)
    const [commentImageId, setCommentImageId] = useState(currentComment?.image_id)


    const handleSubmit = (e) => {
        e.preventDefault()

        const editedComment = {
            id: currentComment.id,
            body: commentBody,
        }
        dispatch(editOneComment(editedComment))
        history.push(`/images/${currentComment.image_id}`)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <textarea value={commentBody} onChange={(e) => {
                setCommentBody(e.target.value)
                setCommentImageId(currentComment?.image_id)
            }}
                placeholder='Add a Comment'></textarea>
            <button>Post</button>
         </form>
    )
}

export default EditCommentForm