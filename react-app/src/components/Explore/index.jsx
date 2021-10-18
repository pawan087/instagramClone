import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { setAllImages } from '../../store/image'
import './explore.css'
import liked from '../../image_assets/liked.svg'
import comment from '../../image_assets/comment.svg'
import Loader from "react-loader-spinner";
import { setAllLikes } from '../../store/like';
import { setAllMyEvents } from '../../store/event';

export default function Explore() {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false)
    const history = useHistory();
    const images = useSelector(state => state.images)
    const likes = useSelector(state => state.likes)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        (async () => {
            await dispatch(setAllImages())
            await dispatch(setAllLikes())
            await dispatch(setAllMyEvents(user.id))
            setLoad(true)
        })();
    }, [dispatch])

    const findLikes = (currentImage) => {
        console.log(currentImage, '-----------------Image passed In---------------')
        return likes?.filter(like => like?.image?.id === currentImage?.id)
    }

    const findComments = (currentImage) => {
        return currentImage?.comments?.comments
    }

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
        <div className="exploreCenter">
            <div className='exploreContainer'>
                {images.map((image) => {
                    return (
                        <div key={image.id} onClick={() => history.push(`/images/${image.id}`)} className="exploreItem">
                            <img src={image.img_url} alt={`image ${image.id}`} draggable="false" />
                            <div className="iconsWrapper">
                                <div className="iconsContainer">
                                    <div className="iconsItem"> <img src={liked} alt="heart comment" />
                                        {findLikes(image)?.length}
                                    </div>
                                    <div className="iconsItem"> <img src={comment} alt="comment box" />
                                        {findComments(image)?.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
