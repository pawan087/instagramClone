import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAllImages } from "../../store/image"
import ImageComponent from "./ImageComponent"
import { setAllUsers } from "../../store/session"
// import Notifications from "../Notifications"
import { setAllLikes } from "../../store/like"
import './images.css'
import { setAllMyEvents } from "../../store/event"
import Loader from "react-loader-spinner";
import Footer from "../Footer"

const Image = () => {

    const [load, setLoad] = useState(false);
    const dispatch = useDispatch()
    const images = useSelector((state) => state.images)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        (async () => {
            await dispatch(setAllImages())
            await dispatch(setAllUsers())
            await dispatch(setAllLikes())
            await dispatch(setAllMyEvents(user.id))
            setLoad(true)
        })();
    }, [dispatch])

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
        <div className="imageContainer">

            {/* <Notifications events={myEvents} /> */}

            {images?.map((image) => (
                <ImageComponent image={image} key={image.id} />
            )).reverse()}
            <Footer />
        </div>
    )
}

export default Image
