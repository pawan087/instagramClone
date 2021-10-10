import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setAllImages, deleteOneImage } from "../../store/image" 
import './images.css'


const Image = () => {
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(setAllImages())
    }, [dispatch])

    const images = useSelector((state) => state.images)
    const user = useSelector((state) => state.session.user)
    
    return (
        <div className="imageContainer">
            
            {images?.map((image) => (
                <div key={image.id} className="individualImage">
                    <h2>{image.title}</h2>
                    <img src={image.img_url} alt="anImage" />
                    <p>{image.caption}</p>
                    <p>{image.user.username}</p>
                    {user?.id === image.user_id ? <button onClick={(e) => dispatch(deleteOneImage(image.id))}>DELETE</button> : false}
                </div>
            ))}
        </div>
    )
}

export default Image