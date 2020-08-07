import React from "react";
import moment from "moment-timezone";
import "./style.css";

function Event(props) {
  return (
    <div className="events">
      <div className="event">
        <props.button />
        <div className="row">
          <div className="title">
            <strong>{props.title}</strong>
          </div>
        </div>
        <p className="notes">{props.notes}</p>
        <div className="row">
          <p className="date"><strong>Date Logged: </strong>{moment(props.date).format("MMM DD, YYYY [at] h:mm a")}</p>
          <p className="notice"><strong>14 Days No Symptoms Marker: </strong>{moment(props.noticeDate).format("MMM DD, YYYY [at] h:mm a")}</p>
        </div>
      </div>
    </div>
  );
}

export default Event;
