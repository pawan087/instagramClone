import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
                    return <img className='exploreItem' key={image.id} src={image.img_url} alt={`image ${image.id}`} />
                })
                }

            </div>
        </div>
    )
}
