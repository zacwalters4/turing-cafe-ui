import React from "react";
import './ResyTile.css';

const ResyTile = (props) => {
    console.log(props.reservation)
    return (
        <div className='ResyTile'>
            <h3>{props.reservation.name}</h3>
            <p>{props.reservation.date}</p>
            <p>{`${props.reservation.time} pm`}</p>
            <p>{`Number of guests: ${props.reservation.number}`}</p>
        </div>
    )
}

export default ResyTile