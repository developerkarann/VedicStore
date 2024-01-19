import React from 'react'
import profile from '../../assets/image/profile.png'
import { Rating } from '@material-ui/lab'


export default function ReviewCard({ review }) {
    const options = {
        readOnly: true,
        precision: 0.5,
        value: review.rating,
       
    }
    return (
        <>
            <div className="reviewCard">
                <img src={profile} alt="" />
                <p>{review.name}</p>
                <Rating {...options} />
                <span className='reviewCardComment'>{review.comment}</span>
            </div>
        </>
    )
}
