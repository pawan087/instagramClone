import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setAllImages } from "../../store/image" 
import './images.css'


const Image = () => {
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(setAllImages())
    }, [dispatch])

    const images = useSelector((state) => state.images)
    
    return (
        <div className="imageContainer">
            
            {images?.map((image) => (
                <div key={image.id} className="individualImage">
                    <h2>{image.title}</h2>
                    <img src={image.img_url} alt="anImage" />
                    <p>{image.caption}</p>
                    <p>{image.user.username}</p>
                </div>
            ))}
        </div>
    )
}

export default Image