import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { setAllImages } from "../../../store/image"
import { editOneImage } from "../../../store/image"

const EditImageForm = () => {
    
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    
    const user = useSelector((state) => state.session.user)
    const images = useSelector((state) => state.images)
    
    useEffect(() => {
        dispatch(setAllImages())
    },[dispatch])

    const currentImage = images.filter((image) => image.id === +params.id)

    console.log(currentImage)

    const [title, setTitle] = useState(currentImage[0]?.title)
    const [caption, setCaption] = useState(currentImage[0]?.caption)
    const [imageUrl, setImageUrl] = useState(currentImage[0]?.img_url)

    const reset = () => {
        setTitle("")
        setCaption("")
        setImageUrl("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
       
        const editedImage = {
            image_id: params.id,
            title,
            caption,
            user_id: user.id,
            img_url: imageUrl
        }

        dispatch(editOneImage(editedImage))
        history.push(`/images/${params.id}`)
        reset()
    }

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label>Image Title</label>
            <input 
                type="text" 
                placeholder="Image Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
            <label>Caption</label>
            <input 
                type="text"
                placeholder="Image Caption" 
                value={caption} 
                onChange={(e) => setCaption(e.target.value)} />
        </div>
        <button>Submit</button>
    </form>
    )
}

export default EditImageForm