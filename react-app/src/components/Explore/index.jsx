import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router';
import { setAllImages } from '../../store/image'
import './explore.css'

export default function Explore() {
    const dispatch = useDispatch();
    const images = useSelector(state => state.images)

    console.log(images, '------------IMAGES-------------');

    useEffect(() => {
        dispatch(setAllImages())
    }, [dispatch])

    return (
        <div className="exploreWrapper">
            <div className='exploreContainer'>
                {images.map((image) => {
                    return (
                        <div key={image.id} className="exploreItem">
                            <img src={image.img_url} alt={`image ${image.id}`} />
                            <NavLink className='linkToUser' to={`/images/${image.id}`}></NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
