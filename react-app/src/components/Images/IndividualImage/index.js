import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router"
import { setAllImages } from "../../../store/image"
import { useEffect } from "react"
import { deleteOneImage } from "../../../store/image"

const IndividualImage = () => {
    
    const images = useSelector((state) => state.images)
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(setAllImages())
    },[dispatch])

    const currentImage = images.filter((image) => image.id === +params.id)[0]
    const user = useSelector((state) => state.session.user)
    
    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteOneImage(currentImage.id))
        history.push("/")
    }

    const handleEdit = (e) => {
        e.preventDefault()
        history.push(`/images/${currentImage.id}/edit`)
    }

    return (
        <div className="individualImage">
            <h1>{currentImage?.title}</h1>
            <img src={currentImage?.img_url} alt="anImage" />
            <h3>{currentImage?.caption}</h3>
            <p><em>{currentImage?.user?.username}</em></p>
            {user?.id === currentImage?.user_id ? <button onClick={handleDelete}>DELETE</button> : false}
            {user?.id === currentImage?.user_id ? <button onClick={handleEdit}>EDIT</button> : false}
        </div>
    )
}

export default IndividualImage