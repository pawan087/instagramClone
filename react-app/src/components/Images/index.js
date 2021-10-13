import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAllImages } from "../../store/image"
import ImageComponent from "./ImageComponent"
import { setAllUsers } from "../../store/session"
import Notifications from "../Notifications"
import { setAllLikes } from "../../store/like"
import './images.css'

const Image = () => {

    const dispatch = useDispatch()
    const images = useSelector((state) => state.images)

    useEffect(() => {
        dispatch(setAllImages())
        dispatch(setAllUsers())
        dispatch(setAllLikes())
    }, [dispatch])

    return (
        <div className="imageContainer">
            
            <Notifications />

            {images?.map((image) => (
                <ImageComponent image={image} key={image.id} />
            ))}
        </div>
    )
}

export default Image
