import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setAllImages } from "../../store/image"
import './images.css'
import ImageComponent from "./ImageComponent"

const Image = () => {

    const dispatch = useDispatch()
    const images = useSelector((state) => state.images)

    useEffect(() => {
        dispatch(setAllImages())
    }, [dispatch])

    return (
        <div className="imageContainer">
            {images?.map((image) => (
                <ImageComponent image={image}/>
            ))}
        </div>
    )
}

export default Image