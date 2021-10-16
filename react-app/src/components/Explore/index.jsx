import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router';
import { setAllImages } from '../../store/image'
import './explore.css'
import liked from '../../image_assets/liked.svg'
import comment from '../../image_assets/comment.svg'

export default function Explore() {
    const dispatch = useDispatch();
    const history = useHistory();
    const images = useSelector(state => state.images)

    console.log(images, '------------IMAGES-------------');

    useEffect(() => {
        dispatch(setAllImages())
    }, [dispatch])

    return (
        <div className="exploreCenter">
            <div className='exploreContainer'>
                {images.map((image) => {
                    return (
                        <div key={image.id} onClick={() => history.push(`/images/${image.id}`)} className="exploreItem">
                            <img src={image.img_url} alt={`image ${image.id}`} />
                            <div className="iconsContainer">
                                <div className="iconsItem"> <img src={liked} alt="" /> 4444</div>
                                <div className="iconsItem"> <img src={comment} alt="" /> 444 </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
