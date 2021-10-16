import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { setAllImages } from "../../../store/image"
import { useEffect } from "react"
import ImageComponent from "../ImageComponent"
import { setAllLikes } from "../../../store/like"

const IndividualImage = () => {

    const images = useSelector((state) => state.images)
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAllImages())
        dispatch(setAllLikes())
    }, [dispatch])

    const currentImage = images.filter((image) => image.id === +params.id)[0]

    return (
        <div className="imageContainer">
            <ImageComponent image={currentImage} />
        </div>
    )
}

export default IndividualImage