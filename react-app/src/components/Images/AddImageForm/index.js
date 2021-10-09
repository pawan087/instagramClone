import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { addOneImage } from "../../../store/image"

const AddImageForm = () => {

    const [title, setTitle] = useState("")
    const [caption, setCaption] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
       
        const newImage = {
            title,
            caption,
            imageUrl,
            user_id: user.id
        }

       dispatch(addOneImage(newImage))
       history.push("/")

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

            <div>
                <label>Image Url</label>
                <input 
                    type="text" 
                    placeholder="Image Url" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} />
            </div>

            <button>Submit</button>
        </form>
    )
}

export default AddImageForm