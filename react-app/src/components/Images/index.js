import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAllImages } from "../../store/image"
import ImageComponent from "./ImageComponent"
import { setAllUsers } from "../../store/session"
// import Notifications from "../Notifications"
import { setAllLikes } from "../../store/like"
import './images.css'
// import { setAllMyEvents } from "../../store/event"

const Image = () => {

    const dispatch = useDispatch()
    const images = useSelector((state) => state.images)
    // const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(setAllImages())
        dispatch(setAllUsers())
        dispatch(setAllLikes())
    }, [dispatch])

    return (
        <div className="imageContainer">
            
            {/* <Notifications events={myEvents} /> */}

            {images?.map((image) => (
                <ImageComponent image={image} key={image.id} />
            ))}
        </div>
    )
}

export default Image
