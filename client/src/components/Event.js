import React from "react";

function Event(props) {
    return (
        <div className="event row align-items-baseline">
            <input type="checkbox" id={props.id} value={props.value}></input>
            <p className="ml-3">{props.title}</p>
            <p className="ml-3">{props.date}</p>
        </div>
    )
}

export default Event;