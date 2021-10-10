import { setComments } from "../../store/comments"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

const commentList = ({ image }) => {

    const dispatch = useDispatch()
    con

    useEffect(() => {
        dispatch(setComments())
    }, [dispatch])

    return (
        <div className='commentContainer'>
            {comments}
        </div>
    )
}

export default commentList