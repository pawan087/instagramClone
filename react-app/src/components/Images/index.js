import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAllImages } from "../../store/image"
import ImageComponent from "./ImageComponent"
import './images.css'

const Image = () => {

    const dispatch = useDispatch()
    const images = useSelector((state) => state.images)

    useEffect(() => {
        dispatch(setAllImages())
    }, [dispatch])

    return (
        <div className="imageContainer">
            {images?.map((image) => (
                <ImageComponent image={image} key={image.id} />
            ))}
        </div>
    )
}

export default Image
