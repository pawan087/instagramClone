import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { addOneImage } from "../../../store/image"
import { setAllImages } from "../../../store/image"
import Footer from "../../Footer"

const AddImageForm = () => {

    const [title, setTitle] = useState("")
    const [caption, setCaption] = useState("")
    // const [imageUrl, setImageUrl] = useState("")
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [hashtags, setHashtags] = useState('')

    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const reset = () => {
        setTitle("")
        setCaption("")
        // setImageUrl("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('title', title)
        formData.append('caption', caption)
        formData.append('img_url', image)
        formData.append('user_id', user.id)
        formData.append('hashtags', hashtags)

        setImageLoading(true)

        await dispatch(addOneImage(formData))

        setImageLoading(false)

        dispatch(setAllImages())

        history.push("/")
        reset()
    }

    const updateImage = (e) => {
        const file = e.target.files[0];

        setImage(file);
    };

    return (
        <>
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

                {/*<div>
                <label>Image Url</label>

                <input
                    type="text"
                    placeholder="Image Url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)} />
            </div>*/}

                <div>
                    <label>Image</label>

                    <input type="file" accept="image/*" onChange={updateImage} />

                    {imageLoading && <p>Loading...</p>}
                </div>

                <div>
                    <label>Hashtags</label>

                    <input
                        type="text"
                        placeholder="Hashtags"
                        value={hashtags}
                        onChange={(e) => setHashtags(e.target.value)} />
                    <p>Separate tags by spaces</p>
                </div>

                {/* <div>
                <label>Hashtag</label>

                <input
                    type="text"
                    placeholder="Hashtag"
                    value={imageUrl}
                    onChange={(e) => setHashtag(e.target.value)} />
            </div> */}

                <button>Submit</button>
            </form>
            <Footer />
        </>
    )
}

export default AddImageForm
