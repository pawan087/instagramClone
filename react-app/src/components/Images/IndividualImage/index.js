import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { setAllImages } from "../../../store/image"
import { useEffect, useState } from "react"
import ImageComponent from "../ImageComponent"
import { setAllLikes } from "../../../store/like"
import Footer from "../../Footer"
import Loader from "react-loader-spinner";
import { setAllMyEvents } from "../../../store/event"

const IndividualImage = () => {
    const [load, setLoad] = useState(false)
    const images = useSelector((state) => state.images)
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await dispatch(setAllImages())
            await dispatch(setAllLikes())
            setLoad(true)
        })();
    }, [dispatch])

    const currentImage = images.filter((image) => image.id === +params.id)[0]

    if (!load) {
        return (
            <div className="loaderIconContainer">
                <Loader
                    type="Puff"
                    color="#e13765"
                    height={100}
                    width={100}
                />
            </div>
        );
    }
    return (
        <>
            <div className="imageContainer">
                <ImageComponent image={currentImage} />
            </div>
            <Footer />
        </>
    )
}

export default IndividualImage